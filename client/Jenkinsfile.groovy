pipeline {
    agent any

    environment {
        // Force les outils de test comme Vitest à s'exécuter avec un seul passage (pas de mode "watch")
        CI = 'true'
    }

    stages {
        stage('Checkout') {
            steps {
                // Récupération du code source
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('client') {
                    echo 'Installation des dépendances npm...'
                    bat 'npm install'
                }
            }
        }

        stage('Test') {
            steps {
                dir('client') {
                    echo 'Exécution des tests...'
                    bat 'npm run test'
                }
            }
        }

        stage('Build') {
            steps {
                dir('client') {
                    echo 'Création du build de production...'
                    bat 'npm run build'
                }
            }
        }

        stage('Archive Artifacts') {
            steps {
                dir('client') {
                    echo 'Archivage du dossier dist...'
                    // Vite place les fichiers compilés dans le dossier 'dist'
                    archiveArtifacts artifacts: 'dist/**/*', allowEmptyArchive: false
                }
            }
        }
    }

    post {
        always {
            echo 'Exécution de la pipeline terminée.'
        }
        success {
            echo 'Frontend build & tests réussis !'
        }
        failure {
            echo 'Échec de la pipeline du frontend.'
        }
    }
}