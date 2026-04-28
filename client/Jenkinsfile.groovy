pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
        // Nom de l'image Docker avec votre compte Docker Hub
        DOCKER_IMAGE = 'amani1998/mycontacts-frontend'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                dir('client') {
                    echo 'Installation des dépendances Frontend...'
                    sh 'npm install'
                }
            }
        }
        
        stage('Test') {
            steps {
                dir('client') {
                    echo 'Exécution des tests unitaires...'
                    // En CI, on s'assure que vitest s'exécute une seule fois (pas de mode watch)
                    sh 'npx vitest run'
                }
            }
        }
        
        stage('Code Quality (SonarQube)') {
            steps {
                dir('client') {
                    echo 'Analyse du code avec SonarQube...'
                    withCredentials([string(credentialsId: 'sonarqube-token', variable: 'SONAR_TOKEN')]) {
                        sh """
                        npx sonar-scanner \
                          -Dsonar.projectKey=mycontacts-frontend \
                          -Dsonar.sources=src \
                          -Dsonar.host.url=http://sonarqube:9000 \
                          -Dsonar.token=\$SONAR_TOKEN
                        """
                    }
                }
            }
        }

        stage('Build') {
            steps {
                dir('client') {
                    echo 'Compilation de l\'application React/Vite...'
                    sh 'npm run build'
                }
            }
        }
        
        stage('Delivery - Build & Push Docker') {
            steps {
                script {
                    echo 'Construction et Publication de l\'image Docker...'
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', passwordVariable: 'DOCKER_PASS', usernameVariable: 'DOCKER_USER')]) {
                        sh 'echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin'
                        sh "docker build -t ${DOCKER_IMAGE}:latest ./client"
                        sh "docker push ${DOCKER_IMAGE}:latest"
                        sh "docker rmi ${DOCKER_IMAGE}:latest" // Nettoyage local
                    }
                }
            }
        }
    }
}