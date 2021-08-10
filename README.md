# Ledn - Technical Assessment (Users Search)

- Candidate Name: Axel Galicia
- email: axelgalicia@gmail.com

---

## Description
---

This solution solves the challenge of listing users using containerized services having:

- Database service - MongoDB
- Backend service - Express JS
- Frontend service - React

## System Requirements
---

This application was tested:
---

- **Docker Version: 20.10.7**
- **Docker Compose Version: 1.29.2**
- **Google Chrome: Version:  92.0.4515.131**
---

## Instalation & Running

1. Clone repository

```
$  git clone https://github.com/axelgalicia/ledn-exercise.git
```

2. Change to ledn-exercise folder and run docker-compose

```
$  docker-compose up
```

3. After image building and services started please open your browser:

```
$ http://localhost:4000
```

## Architechture

![Diagram](https://github.com/axelgalicia/ledn-exercise/blob/master/images/ledn_diagram.png)


## Screenshots

### Loading Data

Here you can load your data by just droping the **accounts.json** file inside the data folder and just pressing the green button to load it automatically. 

The original accounts.json file is already there.

Unique key is email. Duplicates will not be inserted again or replaced.

![Diagram](https://github.com/axelgalicia/ledn-exercise/blob/master/images/load.png)


### Searching

Users can be searched using this section which containes the asked filters and sorting fields. 

The backend API already allows to filter by almost all fields as well as sorting. For the challenge just required fields were added to the UI.

![Diagram](https://github.com/axelgalicia/ledn-exercise/blob/master/images/load.png)


### Results

This paginated table will display all the matched results instantly after updating any filter or sirting field.

- Results are displayed as inserted by default.
- User can Download a CSV file of the current search
- Dates were formatted for easy visualization


![Diagram](https://github.com/axelgalicia/ledn-exercise/blob/master/images/load.png)


## Technology and Tools

### Banckend

- Express JS
- Typescript
- MongoDB
- Mongoose
- Docker

### Frontend

- React (Typescript)
- Semantic UI