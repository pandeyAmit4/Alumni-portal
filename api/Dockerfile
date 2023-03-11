FROM node:12
WORKDIR /app/api
COPY package*.json ./
RUN npm install
COPY . .
ENV MONGO_URI=mongodb+srv://dbAdmin:dbAdmin@cluster0.nvi9g.ENV mongodb.net/alumni-portal?retryWrites=true&w=majority
ENV JWT_SECRET=primuscubs2007
ENV ADMIN_EMAIL=primusalums@gmail.com
ENV ADMIN_EMAIL_PASSWORD=1Primus1
EXPOSE 5000
CMD ["npm","start"]