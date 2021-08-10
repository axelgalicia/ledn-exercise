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

## Installation & Running

1. Clone repository

```
$  git clone https://github.com/axelgalicia/ledn-exercise.git
```

2. Change to ledn-exercise folder and run docker-compose

```
$  docker-compose up
```

3. After image building and services started, please open your browser:

```
$ http://localhost:4000
```

## Architecture

![Diagram](https://github.com/axelgalicia/ledn-exercise/blob/master/images/ledn_diagram.png)


## Screenshots

### Loading Data

Here you can load your data by just dropping the **accounts.json** file inside the data folder and just pressing the green button to load it automatically. 

The original accounts.json file is already there.

Unique key is email. Duplicates will not be inserted again or replaced.

![Diagram](https://github.com/axelgalicia/ledn-exercise/blob/master/images/load.png)


### Searching

Users can be searched using this section which contains the asked filters and sorting fields. 

The backend API already allows filtering by almost all fields, as well as sorting. For the challenge, just required fields were added to the UI.

![Diagram](https://github.com/axelgalicia/ledn-exercise/blob/master/images/filter.png)


### Results

This paginated table will display all the matched results instantly after updating any filter or sorting field.

- Results are displayed as inserted by default.
- User can Download a CSV file of the current search
- Dates were formatted for easy visualization


![Diagram](https://github.com/axelgalicia/ledn-exercise/blob/master/images/results.png)


## Technology and Tools

### Backend

- Express JS
- Typescript
- MongoDB
- Mongoose
- Docker

### Frontend

- React (Typescript)
- Semantic UI


## Assumptions

Based on the data supplied, the following assumptions were made.

- Email could be used as a unique key
- Since there was no requirement to use same JSON key names as provided, keys names were improved to a more standard and easy to manage notation camel case without spaces.
- Data will be loaded automatically when starting the app.
- The null string values were different from a null value, so they were not replaced by any other string when displaying.
- CSV File should be based on current search.

## Considerations

Based on this challenge, the current created stack should be able to handle large amounts of data without any lagging issue. 

If more data or processing needs to be added, it is already containerized and can be started with more replicas for each service.


## Improvements

The project is an MVP which can be used with confidence to provide what the requirement is asking.

If this project were published into a production environment, the next improvements should be made to make it more reliable:


- Introduce unit tests for the backend and frontend to validate the components and the REST API.
- Abstract even more the components on the UI
- Improve code after cleaning and refactoring
- Consider using a Mongo DB Sharding service instead of just one node.
- Consider orchestrating the services using Docker Swarm or Kubernetes.
- Not running containers as a root user
- Providing better configuration for NGINX to allow GZIP and limit request size.
- Integrate HTTPS into the solution
- Improve Dockerfiles


## Author

- Created by Axel Galicia
- Senior Software Engineer
- axelgalicia@gmail.com
- https://axel.today