pipeline {
  agent any
    
  tools {nodejs "node"}
    
  stages {
        
    stage('Cloning Git') {
      steps {
        git branch: 'main', credentialsId: '7862da37-a8bb-419e-95f6-223e2fee9e7b', url: 'https://github.com/Docmachine-Technologies-Private-Limited/docmachine-backend.git'
      }
    }
        
    stage('Install dependencies') {
      steps {
        sh 'npm install'
      }
    }
     
    stage('Test') {
      steps {
         sh 'npm run dev'
      }
    }      
  }
}
