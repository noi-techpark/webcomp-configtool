pipeline {
    agent {
        dockerfile {
            filename 'docker/Dockerfile'
            additionalBuildArgs '--build-arg JENKINS_USER_ID=`id -u jenkins` --build-arg JENKINS_GROUP_ID=`id -g jenkins`'
        }
    }

    options {
        ansiColor('xterm')
    }

    stages {
        stage('Dependencies') {
            steps {
                sh 'yarn install'
            }
        }
        stage('Test') {
            steps {
                sh 'yarn run lint'
            }
        }
        stage('Build') {
            steps {
                sh 'yarn run build'
            }
        }
    }
}
