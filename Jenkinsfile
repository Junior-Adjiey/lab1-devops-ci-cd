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

        stage('Docker Login') {

            agent any

            steps {

                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {

                    sh '''
                    echo "$DOCKER_PASS" | docker login \
                    -u "$DOCKER_USER" \
                    --password-stdin
                    '''
                }
            }
        }

        stage('Push Image') {

            agent any

            steps {

                sh '''
                docker tag \
                calculator-app:${BUILD_NUMBER} \
                juninhoh/calculator-app:${BUILD_NUMBER}

                docker push \
                juninhoh/calculator-app:${BUILD_NUMBER}
                '''
            }
        }

        stage('Deploy') {

            agent any

            steps {

                sh '''
                ansible-playbook \
                -i ansible/inventory \
                ansible/deploy.yml \
                -e version=${BUILD_NUMBER}
                '''
            }
        }

        stage('Verify Deployment') {

            agent any

            steps {

                sh '''
                curl -f http://192.168.56.11:3001 > /dev/null

                echo "Application successfully deployed"
                '''
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