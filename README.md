Darti Frontend (WIP)
======
### Demos
- [Backend](https://backend-darti.apps.ca-central-1.starter.openshift-online.com/) ([repo](https://github.com/nemesiscodex/darti-backend))
    - Basic crud with test data + pagination
- [Frontend](https://frontend-darti.apps.ca-central-1.starter.openshift-online.com/) ([repo](https://github.com/nemesiscodex/darti-frontend))
    - Charts + Sensor List/Create

### Usage
Install [nvm](http://nvm.sh/) to manage node versions
```
nvm install v12
nvm use 12
yarn install
yarn build && yarn start
``` 
The app will be available in http://localhost:3000/

For development:
```
yarn dev
```

### Architecture
<img src="https://user-images.githubusercontent.com/3976562/70764552-a6acbf80-1d36-11ea-907a-626d017cd5de.png" width="300" alt="architecture">

#### Frontend tech
- Reactjs
- Nextjs
- Material-UI
- i18-next
- Leaflet

#### Basic data model
<img src="https://user-images.githubusercontent.com/3976562/70762245-af00fc80-1d2e-11ea-8b59-6a18d3bffe6d.png" alt="Data model" width="300" />

- **Area**: A named area in a map. A polygon defined by a list of points with GPS coordinates.
- **Sensor**: Sensor with a type, an identifier and GPS coordinates.
- **Activation**: It represents the activation count of a Sensor in a specific reading instance.
- **Reading**: A reading represents the state of the sensor network in a specific moment in time. It also contains weather information, the system status and GPS coordinates.

#### Roadmap
- [ ] Generic sensor dashboard. Can be used for similar projects.
- [ ] /login User authentication + logout + Role/permission handling.
- [ ] /sensors Sensor Crud + Validation
- [ ] /areas Area Crud + Draw Area polygon in map + Validation
- [ ] /map to display sensors. Filter by Area/Date range. Heatmap of activations. 
- [ ] / (home) add project description + infographics
- [ ] /download Download all data in csv or json formats.
- [ ] /user User crud
    - [ ] Role/Permission management
- [ ] /settings
    - [ ] Enable/disable Download data (Feature flag)
    - [ ] Add sensor types
    - [ ] Manually load data with csv
    - [ ] Clear cache on demand
- [ ] Translate the whole site
    - [ ] Spanish
    - [ ] Other languages?
- [ ] Reduce data usage in charts
- [ ] Improve filtering in charts
- [ ] Add more charts/reports
- [ ] Improve Accessibility
- [ ] Performance improvements (Make sure is accessible with slow internet!)
- [ ] Improve Offline support and PWA
- [ ] Improve Responsiveness

## About the project
### Chagas Disease
In Paraguay, as well as in other Latin American countries, [Chagas disease](https://en.wikipedia.org/wiki/Chagas_disease)
is one of the pressing issues in the area of public health.

This disease is caused by the parasite [Trypanosoma cruzi](https://en.wikipedia.org/wiki/Trypanosoma_cruzi), being [Triatoma infestans](https://en.wikipedia.org/wiki/Triatoma_infestans) insect or commonly called vinchuca (kissing bug), the main vector of South America.

Currently, there is a concern in European countries and on the United States, due to the growing eco-tourism to South American countries, where Chagas disease is referred to as an "exotic disease".
Prevention mostly involves eliminating kissing bugs and avoiding their bites. **A vaccine has not been developed as of 2019**.

Treatment options for infected patients are limited.
Early infections are treatable with the medication if given early, but becomes less effective the longer a person has had Chagas disease.

Most people with the disease live in poverty, and do not realize they are infected. 

#### Eradication of Chagas Disease with Technology
> A project in conjunction with the [Center for the Development of Scientific Research (CEDIC)](https://www.cedicpy.com/) and the [Polytechnic School of the National University of Asunción](http://www.fpuna.edu.py/).  

The monitoring of the vector transmitting Chagas disease will be possible through the implementation of a wireless infrared photoelectric sensor network for remote early detection of kissing bugs infestation in a surveillance zone.
Readings of the sensor network will be sent from a ground station to the research lab located in the Polytechnic School using a [satellite](https://birds4.birds-project.com/).
