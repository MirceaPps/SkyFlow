# Proiect Final DevOps 

## Descriere Proiect

Acest proiect reprezintă implementarea unui pipeline complet DevOps pentru o aplicație web de gestionare a zborurilor.

Aplicația este containerizată folosind Docker și automatizată prin Jenkins CI/CD, iar infrastructura de monitorizare și logging este realizată cu Prometheus, Grafana, Loki și Promtail.

Proiectul demonstrează utilizarea principalelor tehnologii și practici DevOps studiate în cadrul cursului:
- CI/CD
- Infrastructure as Code
- Containerizare
- Monitoring
- Logging centralizat
- Security Scanning
- Automatizare infrastructură

# Funcționalități Implementate

## Aplicație Web
- Interfață modernă React
- Backend Python FastAPI
- Gestionare zboruri
- Adăugare zboruri dinamice

## CI/CD Pipeline – Jenkins
Pipeline automatizat care:
- preia codul sursă din Gitea
- build-uiește containerele Docker
- rulează health checks
- rulează security scanning cu Trivy
- pornește aplicația automat

## Containerizare – Docker
Aplicația este împărțită în mai multe containere:
- frontend
- backend
- PostgreSQL
- Prometheus
- Grafana
- Loki
- Promtail
- Alertmanager
- cAdvisor

## Monitoring – Prometheus + Grafana
Sistemul de monitorizare colectează:
- CPU usage
- Memory usage
- Network traffic
- Container metrics

## Logging – Loki + Promtail
Sistem de logging centralizat:
- Promtail colectează logurile containerelor
- Loki stochează logurile
- Grafana afișează logurile în timp real

## Alerting – Alertmanager
Alertmanager gestionează alertele generate de Prometheus:
- servicii DOWN
- probleme infrastructură
- metrici anormale

## Security Scanning – Trivy
Pipeline-ul rulează scanări automate pentru:
- vulnerabilități Docker images
- probleme de securitate

## Automatizare Configurare – Ansible
Folderul ansible conține playbook-uri pentru:
- configurare servere
- automatizare setup infrastructură

# Structura Proiectului

ProjectDev/
│
├── infra/
│   ├── docker-compose.jenkins.yml
│   ├── Dockerfile.jenkins
│
├── travel-devops/
│   ├── backend/
│   ├── frontend/
│   ├── monitoring/
│   ├── ansible/
│   ├── nginx/
│   ├── docker-compose.yml
│   ├── Jenkinsfile
│   ├── Jenkinsfile.healthchecks
│   ├── Jenkinsfile.security
│
│
└── README.md

# Tehnologii Folosite

- React
- FastAPI
- PostgreSQL
- Docker
- Docker Compose
- Jenkins
- Gitea
- Prometheus
- Grafana
- Loki
- Promtail
- Alertmanager
- Trivy
- Terraform
- Ansible

# Cum se Rulează Proiectul

## Pornirea infrastructurii Jenkins

cd infra
docker compose -f docker-compose.jenkins.yml up -d

## Pornirea aplicației

cd travel-devops
docker compose up -d

# Acces Aplicație

Frontend: http://localhost:8081
Jenkins: http://localhost:8080
Grafana: http://localhost:3001
Prometheus: http://localhost:9090
Alertmanager: http://localhost:9093
cAdvisor: http://localhost:8082
