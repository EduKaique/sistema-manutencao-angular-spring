# Estágio Base (Com dependências e Maven)
FROM eclipse-temurin:21-jdk-jammy AS base
WORKDIR /app
COPY .mvn .mvn
COPY mvnw pom.xml ./
RUN chmod +x mvnw
RUN ./mvnw dependency:go-offline
COPY src ./src

FROM base AS dev
CMD ["bash", "./mvnw", "spring-boot:run", "-Dspring-boot.run.jvmArguments='-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005'"]

FROM base AS build
RUN ./mvnw package -DskipTests

FROM eclipse-temurin:21-jre-jammy AS prod
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]