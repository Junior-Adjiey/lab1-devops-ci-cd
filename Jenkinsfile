pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Junior-Adjiey/lab1-devops-ci-cd.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('app/calculator') {
                    sh 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                dir('app/calculator') {
                    sh 'npm test'
                }
            }
        }

        stage('Docker Remote API') {
            steps {
                sh 'curl http://192.168.56.11:2375/version'
            }
        }

        stage('Create Build Container') {
            steps {
                sh '''
                curl -X POST \
                -H "Content-Type: application/json" \
                -d '{
                  "Image":"node:22",
                  "Cmd":["node","--version"]
                }' \
                http://192.168.56.11:2375/containers/create?name=build-agent

                curl -X POST \
                http://192.168.56.11:2375/containers/build-agent/start
                '''
            }
        }

        stage('Delete Build Container') {
            steps {
                sh '''
                curl -X DELETE \
                http://192.168.56.11:2375/containers/build-agent?force=true
                '''
            }
        }
    }
}