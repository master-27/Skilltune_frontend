---

# **SkillTune**  
_A platform to enhance technical skills through personalized practice sessions_

## **Overview**
SkillTune is a web application designed to help professionals and students improve their technical skills by generating personalized practice questions based on their resume, experience, and technical expertise. The platform dynamically adapts to the user's progress and provides real-time feedback.

## **Features**
- **Personalized Practice Sessions**: Extracts technical skills from user-uploaded resumes (using Apache Tika) and generates tailored practice questions via Google Gemini API.
- **Voice Input for Interview Questions**: Allows users to record and submit answers to practice interview questions, with feedback based on their voice confidence and performance.
- **Interview Preparation**: Generates custom interview questions based on user experience and projects. Allows users to re-record their answers.
- **Session History**: Stores and fetches session results, tracks progress across skills, and sorts results by session date.
- **Multiple Difficulty Levels**: Differentiates questions based on levels such as entry-level, intermediate, and advanced.
- **Progress Tracking and Feedback**: Dynamically tracks user performance and offers real-time feedback to enhance learning.
- **AWS S3 Audio Storage**: Records and stores user audio submissions in MP3 format for smaller file sizes and passes them for transcription.
- **Real-Time Transcription**: Uses AssemblyAI for speech-to-text functionality to process user responses.
- **Security**: Uses AWS Elastic Beanstalk for deployment with HTTPS configuration to ensure secure communication.

## **Technologies Used**

### **Frontend**:
- **React.js**: For building the user interface.
- **Tailwind CSS**: For responsive and modern design.
- **Axios**: For handling API requests.
- **React Router**: For navigation and routing between components.
- **LocalStorage API**: For storing and retrieving user session data.

### **Backend**:
- **Spring Boot**: Backend service to manage user data, sessions, and generate content.
- **MySQL**: Database to store user sessions, results, and generated questions.
- **Apache Tika**: For parsing resumes and extracting skills, experience, and projects.
- **FFmpeg**: For audio compression.
- **AWS SDK**: To store audio files in S3 and retrieve them for processing.
- **AssemblyAI**: For real-time speech-to-text processing of recorded answers.
- **Google Gemini API**: For generating custom practice questions and content based on user inputs.

### **Cloud and Deployment**:
- **AWS Elastic Beanstalk**: For application deployment and management.
- **AWS RDS**: For hosting the MySQL database.
- **AWS S3**: For storing user-uploaded files (e.g., audio recordings).
- **Netlify**: For deploying the frontend with HTTPS.
- **ACM (AWS Certificate Manager)**: For SSL/TLS certificates to enable HTTPS for the backend.

## **Setup Instructions**

### **1. Prerequisites**
- Node.js (v14 or above)
- Java 11 (for Spring Boot)
- Maven
- MySQL
- AWS Account

### **2. Frontend Setup**
1. Clone the repository.
    ```bash
    git clone https://github.com/yourusername/SkillTune.git
    cd SkillTune/frontend
    ```
2. Install dependencies.
    ```bash
    npm install
    ```
3. Start the development server.
    ```bash
    npm start
    ```

### **3. Backend Setup**
1. Navigate to the backend directory.
    ```bash
    cd ../backend
    ```
2. Configure the `application.properties` file with your MySQL and AWS S3 credentials.
    ```properties
    spring.datasource.url=jdbc:mysql://<your-mysql-url>:3306/skilltune
    spring.datasource.username=<your-db-username>
    spring.datasource.password=<your-db-password>

    cloud.aws.credentials.accessKey=<your-aws-access-key>
    cloud.aws.credentials.secretKey=<your-aws-secret-key>
    cloud.aws.region.static=<your-aws-region>
    cloud.aws.s3.bucket=<your-s3-bucket-name>
    ```
3. Build the backend project.
    ```bash
    mvn clean install
    ```
4. Run the backend server.
    ```bash
    java -jar target/skilltune-0.0.1-SNAPSHOT.jar
    ```

### **4. AWS Setup**
1. **Elastic Beanstalk**:  
   Deploy the backend application using Elastic Beanstalk by following the AWS documentation. Ensure that you set up HTTPS with ACM.
   
2. **S3 Setup**:  
   Create an S3 bucket for storing audio files and ensure the bucket policy allows access from the application.

3. **RDS Setup**:  
   Use AWS RDS to set up a MySQL database and configure the backend to connect to it.

### **5. Environment Variables**
Set up the following environment variables on your local machine or your deployment platform (Elastic Beanstalk, Netlify):

- `MYSQL_URL`
- `MYSQL_USERNAME`
- `MYSQL_PASSWORD`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `S3_BUCKET_NAME`
- `ASSEMBLY_AI_API_KEY`
- `GEMINI_API_KEY`

### **6. Netlify Deployment (Frontend)**
1. Install the Netlify CLI.
    ```bash
    npm install -g netlify-cli
    ```
2. Deploy the frontend to Netlify.
    ```bash
    netlify deploy
    ```

### **7. HTTPS Setup**
Follow the steps to set up SSL for your Elastic Beanstalk environment:
- Use AWS ACM to request an SSL certificate.
- Set up the load balancer to handle HTTPS traffic.
- Enable automatic redirection from HTTP to HTTPS.

## **Future Features**
- **Gamified Learning**: Introduce a points and rewards system based on user progress and completed sessions.
- **Question Pool Expansion**: Add support for more technical domains and advanced skills.
- **Real-Time AI Feedback**: Implement more detailed AI-based analysis of user answers, including body language, facial expression (via webcam), and timing of responses.

## **Contributing**
Contributions are welcome! Please fork the repository and create a pull request with detailed descriptions of the changes you’ve made.


