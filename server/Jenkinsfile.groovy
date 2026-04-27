pipeline {
    agent any

    environment {
        // Nom de l'image Docker pour le backend
        DOCKER_IMAGE = 'amani1998/mycontacts-backend'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                dir('server') {
                    echo 'Installation des dépendances Backend...'
                    sh 'npm install'
                }
            }
        }
        
        stage('Test') {
            steps {
                dir('server') {
                    echo 'Exécution des tests unitaires et d\'intégration (Jest)...'
                    sh 'npm test'
                }
            }
        }
        
        stage('Delivery - Build & Push Docker') {
            steps {
                script {
                    echo 'Construction et Publication de l\'image Docker Backend...'
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', passwordVariable: 'DOCKER_PASS', usernameVariable: 'DOCKER_USER')]) {
                        sh 'echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin'
                        sh "docker build -t ${DOCKER_IMAGE}:latest ./server"
                        sh "docker push ${DOCKER_IMAGE}:latest"
                        sh "docker rmi ${DOCKER_IMAGE}:latest" // Nettoyage local pour libérer de l'espace
                    }
                }
            }
        }
    }
}