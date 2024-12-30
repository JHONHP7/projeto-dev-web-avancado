#!/bin/bash

# Derrubar container antigo se estiver ON
echo "Derrubando containers antigos..."
docker-compose down

# Criar .jar do projeto
echo "Criando .jar do projeto..."
mvn clean package

# Buildar imagens e containers
echo "Buildando imagens e containers..."
docker-compose build

# Subir container
echo "Subindo containers..."
docker-compose up -d

echo "Processo concluído!"
