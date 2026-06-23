pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git branch: 'Lucie',
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
    }
}