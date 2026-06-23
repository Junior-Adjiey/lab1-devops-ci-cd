pipeline {

    agent {
        docker {
            image 'node:22'
        }
    }

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

        stage('Build Docker Image') {
            steps {
                dir('app/calculator') {
                    sh '''
                    docker build \
                    -t juninhoh/calculator-app:${BUILD_NUMBER} .
                    '''
                }
            }
        }
        stage('List Images') {
            steps {
                sh 'docker images'
            }
        }
    }
}