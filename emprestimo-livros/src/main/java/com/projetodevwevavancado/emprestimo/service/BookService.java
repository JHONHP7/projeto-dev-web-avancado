package com.projetodevwevavancado.emprestimo.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.TimeZone;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projetodevwevavancado.emprestimo.api.dto.request.BookRequestByTitleDTO;
import com.projetodevwevavancado.emprestimo.api.dto.response.BookDTO;
import com.projetodevwevavancado.emprestimo.api.dto.response.BookResponseDTO;
import com.projetodevwevavancado.emprestimo.api.dto.response.BookUpdateDTO;
import com.projetodevwevavancado.emprestimo.api.resource.handler.exceptions.NegativeQuantityException;
import com.projetodevwevavancado.emprestimo.entity.BookEntity;
import com.projetodevwevavancado.emprestimo.repository.BookRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookService {
	
	private static final String GTIN = "978";
    private static final Random RANDOM = new Random();
	
	@Autowired
	private final BookRepository bookRepository;
	
	/**
	 * Converte uma entidade de livro para o DTO de livro.
	 *
	 * @param bookEntity a entidade de livro a ser convertida
	 * @return o DTO de livro correspondente
	 */
	public BookDTO convertBookEntityToBookDTO(BookEntity bookEntity) {
	    return new BookDTO(
	            bookEntity.getId(),
	            bookEntity.getTitulo(),
	            bookEntity.getAutor(),
	            bookEntity.getDisponivel(),
	            bookEntity.getQuantidadeExemplares()
	    );
	}
	
	/**
	 * Mapeia uma entidade de livro para o DTO de atualização de livro.
	 *
	 * @param entity a entidade de livro a ser mapeada
	 * @return o DTO de atualização de livro correspondente
	 */
	public BookUpdateDTO mapToDTO(BookEntity entity) {
	    SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
	    sdf.setTimeZone(TimeZone.getTimeZone("GMT-3"));
	    return BookUpdateDTO.builder()
	        .bookId(entity.getId())
	        .bookTitle(entity.getTitulo())
	        .bookAuthor(entity.getAutor())
	        .bookIsbn(entity.getIsbn())
	        .bookGenero(entity.getGenero())
	        .bookAvailable(entity.getDisponivel())
	        .bookQuantity(entity.getQuantidadeExemplares())
	        .publicationDate(entity.getDataPublicacao() != null 
	            ? sdf.format(entity.getDataPublicacao()) 
	            : null)
	        .build();
	}

	/**
	 * Recupera todos os livros armazenados no repositório.
	 *
	 * @return uma lista de todas as entidades de livro
	 */
	public List<BookEntity> findAll() {
		return bookRepository.findAll();
	}

	/**
	 * Recupera todo os livros armazenados com gênero
	 * Converte cada entidade para o DTO
	 * @return
	 */
	public List<BookResponseDTO> getAllBooks() {
		List<BookEntity> bookEntities = bookRepository.findAll();
		return bookEntities.stream()
				.map(BookResponseDTO::new)
				.collect(Collectors.toList());
	}

	/**
	 * Recupera um livro pelo seu ID.
	 *
	 * @param entity a entidade contendo o ID do livro a ser recuperado
	 * @return a entidade de livro correspondente ao ID fornecido
	 */
	public BookEntity findById(BookEntity entity) {
		return bookRepository.findById(entity.getId()).orElseThrow(() -> new RuntimeException("Livro não encontrado"));
	}
	
	/**
	 * Recupera um livro pelo seu ID e o mapeia para um DTO.
	 *
	 * @param id o ID do livro a ser recuperado
	 * @return o DTO de atualização do livro correspondente ao ID fornecido
	 */
	public BookUpdateDTO findByBookById(Long id) {
		 BookEntity bookEntity = bookRepository.findById(id)
	                .orElseThrow(() -> new RuntimeException("Livro não encontrado"));
	        
	        return mapToDTO(bookEntity);
	}

	/**
	 * Recupera um livro pelo seu título.
	 *
	 * @param title o título do livro a ser procurado
	 * @return a entidade de livro correspondente ao título fornecido
	 */
	public BookEntity findByTitle(String title) {
		List<BookEntity> allBooks = bookRepository.findAll();
		for (BookEntity book : allBooks) {
			if (book.getTitulo().equalsIgnoreCase(title)) {
				return book;
			}
		}
		return null;
	}

	/**
	 * Exclui um livro do repositório.
	 *
	 * @param entity a entidade do livro a ser excluída
	 * @return um valor nulo após a exclusão
	 */
	public Void delete(BookEntity entity) {
		bookRepository.delete(findById(entity));
		return null;
	}
	
	/**
	 * Salva uma entidade de livro no repositório.
	 *
	 * @param bookEntity a entidade de livro a ser salva
	 * @return a entidade de livro salva
	 */
	public BookEntity save(BookEntity bookEntity) {
		return bookRepository.save(bookEntity);
	}
	
	/**
	 * Salva um novo livro, verificando se a quantidade de exemplares é negativa.
	 *
	 * @param bookEntity a entidade de livro a ser salva
	 * @return a entidade de livro salva
	 * @throws NegativeQuantityException se a quantidade de exemplares for negativa
	 */
	public BookEntity saveBook(BookEntity bookEntity) {
	    validateBookQuantity(bookEntity.getQuantidadeExemplares());

	    if (bookEntity.getTitulo() == null || bookEntity.getAutor() == null || bookEntity.getIsbn() == null) {
	        throw new IllegalArgumentException("Campos obrigatórios não podem ser nulos para inserção.");
	    }

	    return bookRepository.save(bookEntity);
	}

	/**
	 * Atualiza um livro existente, verificando se a quantidade de exemplares é negativa.
	 *
	 * @param bookEntity a entidade de livro com os dados a serem atualizados
	 * @return a entidade de livro atualizada
	 * @throws NegativeQuantityException se a quantidade de exemplares for negativa
	 */
	public BookEntity updateBook(BookEntity bookEntity) {
		
	    validateBookQuantity(bookEntity.getQuantidadeExemplares());
	   

	    BookEntity existingBook = bookRepository.findById(bookEntity.getId())
	            .orElseThrow(() -> new IllegalArgumentException("Livro não encontrado para o id: " + bookEntity.getId()));

	    BeanUtils.copyProperties(bookEntity, existingBook, getNullPropertyNames(bookEntity));

	    return bookRepository.save(existingBook);
	}


	/**
	 * Salva ou atualiza um livro, dependendo se o ID está presente.
	 *
	 * @param bookEntity a entidade de livro a ser salva ou atualizada
	 * @return o DTO de resposta do livro correspondente
	 */
	public BookResponseDTO saveOrUpdateBook(BookEntity bookEntity) {
	    validateBookQuantity(bookEntity.getQuantidadeExemplares());

	    if (bookEntity.getId() == null) {
	        if (bookEntity.getIsbn() == null || bookEntity.getIsbn().isBlank()) {
	            String generatedIsbn;
	            do {
	                generatedIsbn = IsbnGenerator.generateIsbn();
	            } while (bookRepository.existsByIsbn(generatedIsbn));
	            bookEntity.setIsbn(generatedIsbn);
	        } else if (bookRepository.existsByIsbn(bookEntity.getIsbn())) {
	            throw new IllegalArgumentException("ISBN já existe no banco de dados: " + bookEntity.getIsbn());
	        }
	    } else { 
	        BookEntity existingBook = bookRepository.findById(bookEntity.getId())
	                .orElseThrow(() -> new IllegalArgumentException("Livro não encontrado para o ID: " + bookEntity.getId()));

	        bookEntity.setIsbn(existingBook.getIsbn());
	    }

	    BookEntity savedBook = bookRepository.save(bookEntity);
	    return new BookResponseDTO(savedBook);
	}


	/**
	 * Obtém os nomes das propriedades nulas de uma entidade.
	 *
	 * @param source a entidade da qual as propriedades nulas serão verificadas
	 * @return um array de nomes das propriedades nulas
	 */
	private String[] getNullPropertyNames(Object source) {
	    final BeanWrapper src = new BeanWrapperImpl(source);
	    java.beans.PropertyDescriptor[] pds = src.getPropertyDescriptors();
	    List<String> nullPropertyNames = new ArrayList<>();
	    for (java.beans.PropertyDescriptor pd : pds) {
	        if (src.getPropertyValue(pd.getName()) == null) {
	            nullPropertyNames.add(pd.getName());
	        }
	    }
	    return nullPropertyNames.toArray(new String[0]);
	}
	
	/**
	 * Busca livros pelo título e os mapeia para DTOs.
	 *
	 * @param title o DTO contendo o título do livro a ser procurado
	 * @return uma lista de DTOs de livros que correspondem ao título
	 */
	public List<BookDTO> findBookAllBookById(BookRequestByTitleDTO title) {
	    String searchTitle = "%" + title.getTitle() + "%";
	    List<BookEntity> entities = bookRepository.findBookAllBookByTitle(searchTitle);

	    List<BookDTO> dtos = entities.stream()
	        .map(this::bookEntityToDTO)
	        .collect(Collectors.toList());

	    return dtos;
	}

	/**
	 * Converte uma entidade de livro para DTO de livro.
	 *
	 * @param entity a entidade de livro a ser convertida
	 * @return o DTO de livro correspondente
	 */
	private BookDTO bookEntityToDTO(BookEntity entity) {
		return BookDTO.builder()
				.bookAuthor(entity.getAutor())
				.bookAvailable(entity.getDisponivel())
				.bookId(entity.getId())
				.bookQuantity(entity.getQuantidadeExemplares())
				.bookTitle(entity.getTitulo())
				.build();
	}
	
	/**
	 * Gerarando ISBN
	 */
	
	public class IsbnGenerator {

	    public static String generateIsbn() {
	        String group = "0";
	        String publisher = String.format("%3d", RANDOM.nextInt(1000)).replace(' ', '0'); 
	        String title = String.format("%5d", RANDOM.nextInt(100000)).replace(' ', '0'); 
	        String isbnWithoutCheckDigit = GTIN + group + publisher + title;

	        String checkDigit = calculateCheckDigit(isbnWithoutCheckDigit);

	        return String.format("%s-%s-%s-%s-%s", GTIN, group, publisher, title, checkDigit);
	    }

	    private static String calculateCheckDigit(String isbnWithoutCheckDigit) {
	        int sum = 0;
	        for (int i = 0; i < isbnWithoutCheckDigit.length(); i++) {
	            int digit = Character.getNumericValue(isbnWithoutCheckDigit.charAt(i));
	            sum += (i % 2 == 0) ? digit : digit * 3;
	        }
	        int mod = sum % 10;
	        return (mod == 0) ? "0" : String.valueOf(10 - mod);
	    }
	}
	
	/**
	 * Valida a quantidade de exemplares do livro.
	 *
	 * @param quantity a quantidade de exemplares a ser validada
	 * @throws NegativeQuantityException se a quantidade de exemplares for negativa
	 */
	private void validateBookQuantity(Integer quantity) {
	    if (quantity == null || quantity < 0) {
	        throw new NegativeQuantityException("A quantidade de exemplares não pode ser negativa.");
	    }
	}
}
