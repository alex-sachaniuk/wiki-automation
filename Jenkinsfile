pipeline {
    agent { docker { image 'node:12.16.2' } }
    stages {
        stage('test') {
            steps {
                sh 'npx mocha test/index.js'
            }
        }
    }
}