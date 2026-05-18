# Descriere Proiect

Proiectul este o aplicație web containerizată pentru gestionarea zborurilor, realizată folosind practici DevOps.

Proiectul implementează:

- CI/CD cu Jenkins
- Containerizare Docker
- Automatizare cu Ansible
- Monitoring cu Prometheus și Grafana
- Logging centralizat cu Loki și Promtail
- Security scanning cu Trivy
- Health checks automate


# Arhitectura Proiectului

Aplicația este formată din:

- Frontend React + Nginx
- Backend FastAPI
- PostgreSQL
- Jenkins
- Prometheus
- Grafana
- Loki
- Promtail
- Alertmanager
- cAdvisor
- Ansible


# Tehnologii utilizate

| Componentă | Tehnologie |
|---|---|
| Frontend | React |
| Backend | FastAPI |
| Database | PostgreSQL |
| CI/CD | Jenkins |
| Containerizare | Docker |
| Orchestrare | Docker Compose |
| Automatizare | Ansible |
| Monitoring | Prometheus |
| Dashboard-uri | Grafana |
| Logging | Loki + Promtail |
| Alerting | Alertmanager |
| Security Scan | Trivy |
| Metrics | cAdvisor |
| Version Control | Git + Gitea |

---

# Structura proiectului

ProjectDev/
│
├── backend/
├── frontend/
├── monitoring/
├── ansible/
├── infra/
├── nginx/
├── Jenkinsfile
├── Jenkinsfile.healthchecks
├── Jenkinsfile.security
├── docker-compose.yml
└── README.md