pipeline {
    agent any

    environment {
        NODE_VERSION = "20"
        APP_NAME = "skp.simpuskes.com"
        DEPLOY_PATH = "/home/simpuskes-skp/htdocs/skp.simpuskes.com"
        SOURCE_BRANCH = "main"
    }
    stages {
        stage('Checkout') {
            steps {
                script {
                    checkout scm
                }
            }
        }

        stage('Move path') {
            steps {
                script {
                    sh "cd $DEPLOY_PATH"
                }
            }
        }

        stage('Pull branch') {
            steps {
                script {
                    sh "git pull origin $SOURCE_BRANCH"
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    sh "nvm use $NODE_VERSION && npm install"
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    sh "nvm use $NODE_VERSION && npm run build"
                }
            }
        }

        stage('Restart App') {
            steps {
                script {
                    sh "pm2 restart $APP_NAME"
                }
            }
        }    
    }
}
