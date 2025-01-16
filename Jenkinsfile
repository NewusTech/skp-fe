pipeline {
    agent any

    environment {
        NODE_VERSION = "20" // Ganti dengan versi Node.js yang sesuai
        // BUILD_DIR = "build"
        // DEPLOY_SERVER = "your-server-ip" // Ganti dengan IP atau hostname server Anda
        // DEPLOY_USER = "your-username" // Ganti dengan username server Anda
        APP_NAME = "skp.simpuskes.com" // Nama aplikasi di PM2
        DEPLOY_PATH = "/home/simpuskes-skp/htdocs/skp.simpuskes.com" // Path tujuan deploy di server Anda
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

        stage('Move path') {
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
