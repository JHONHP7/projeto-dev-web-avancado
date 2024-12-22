FROM eclipse-temurin:17-jdk-jammy

# Configura o fuso horário para o Brasil (São Paulo)
RUN apt-get update && apt-get install -y tzdata && \
    ln -sf /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime && \
    dpkg-reconfigure -f noninteractive tzdata

WORKDIR /app

COPY target/*.jar app.jar

ENV SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/emprestimo_livros
ENV SPRING_DATASOURCE_USERNAME=postgres
ENV SPRING_DATASOURCE_PASSWORD=1996
ENV API_SECURITY_TOKEN_SECRET=my-secret-key
ENV GOOGLE_CLIENT_ID=1080697336488-lqffnqk5lppnqkionbrnit6ubr0hpam6.apps.googleusercontent.com
ENV GOOGLE_CLIENT_SECRET=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
#ENV SPRING_PROFILES_ACTIVE=prod
# Criação do diretório de uploads
RUN mkdir -p /app/src/main/resources/uploads/images/ && chmod -R 777 /app/src/main/resources/uploads/images/

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
