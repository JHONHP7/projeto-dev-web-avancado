/* eslint-disable @typescript-eslint/no-explicit-any */

// Componente de Card para exibir informações de anúncios
const AdvertiseCard = ({ ad }: { ad: any }) => {
  return (
    <div className="border border-gray-300 rounded p-4 mb-4 shadow-sm">
      <h3 className="text-lg font-semibold">{ad.title}</h3>
      <p className="text-sm text-gray-700">Categoria: {ad.category}</p>
      <p className="text-sm text-gray-700">Descrição: {ad.description}</p>
      <p className="text-sm text-gray-700">Preço: R$ {ad.price}</p>
      <p className="text-sm text-gray-700">Contato: {ad.contact_info}</p>
      <p className="text-sm text-gray-700">Localização: {ad.location}</p>
    </div>
  );
};

export default AdvertiseCard;