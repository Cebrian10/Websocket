package com.cebrian.test.config.datasources;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import jakarta.persistence.EntityManagerFactory;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(entityManagerFactoryRef = "TestEntityManagerFactory", transactionManagerRef = "TestTransactionManager", basePackages = {
    "com.cebrian.test.app.Clientes.repositories"
})

public class TESTDatasourceConfig {
    // @Primary
    @Bean(name = "TestProperties")
    @ConfigurationProperties("spring.datasource.test")
    public DataSourceProperties dataSourceProperties() {
        return new DataSourceProperties();
    }

    // @Primary
    @Bean(name = "TestDatasource")
    @ConfigurationProperties(prefix = "spring.datasource.test")
    public DataSource datasource(@Qualifier("TestProperties") DataSourceProperties properties) {
        return properties.initializeDataSourceBuilder().build();
    }

    // @Primary
    @Bean(name = "TestEntityManagerFactory")
    public LocalContainerEntityManagerFactoryBean entityManagerFactoryBean(EntityManagerFactoryBuilder builder,
            @Qualifier("TestDatasource") DataSource dataSource) {
        return builder.dataSource(dataSource)
                .packages("com.cebrian.test.app.Clientes.entity")
                .persistenceUnit("usuarios").build();
    }

    // @Primary
    @Bean(name = "TestTransactionManager")
    @ConfigurationProperties("spring.jpa")
    public PlatformTransactionManager transactionManager(
            @Qualifier("TestEntityManagerFactory") EntityManagerFactory entityManagerFactory) {
        return new JpaTransactionManager(entityManagerFactory);
    }
}