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

        stage('Deploy Application') {
            steps {
                sh '''
                curl -X DELETE \
                http://192.168.56.11:2375/containers/calculator-prod?force=true || true

                curl -X POST \
                -H "Content-Type: application/json" \
                -d '{
                "Image":"juninhoh/calculator-app:v1",
                "HostConfig":{
                    "PortBindings":{
                    "3000/tcp":[{"HostPort":"3001"}]
                    }
                }
                }' \
                http://192.168.56.11:2375/containers/create?name=calculator-prod

                curl -X POST \
                http://192.168.56.11:2375/containers/calculator-prod/start
                '''
            }
        }

        stage('Run Ansible Playbook') {
            steps {
                sh '''
                ansible-playbook \
                -i ansible/inventory \
                ansible/nginx.yml
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