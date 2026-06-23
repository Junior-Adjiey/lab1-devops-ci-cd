pipeline {

    agent none

    stages {

        stage('Build & Test') {

            agent {
                docker {
                    image 'node:22'
                }
            }

            steps {

                git branch: 'main',
                    url: 'https://github.com/Junior-Adjiey/lab1-devops-ci-cd.git'

                dir('app/calculator') {
                    sh 'npm install'
                    sh 'npm test'
                }
            }
        }

        stage('Build Docker Image') {

            agent any

            steps {

                dir('app/calculator') {

                    sh '''
                    docker build \
                    -t calculator-app:${BUILD_NUMBER} .
                    '''

                }
            }
        }

        stage('List Images') {

            agent any

            steps {

                sh 'docker images'
            }
        }
    }
}