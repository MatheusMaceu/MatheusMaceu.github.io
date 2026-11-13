export default {
  "smartWaste.eyebrow": "Case study · Integrative Project · SPTech · 2026",
  "smartWaste.tagline": "From sensor readings to collection decisions.",
  "smartWaste.intro":
    "An academic project to monitor how full hospital waste containers are and organize their readings in a dashboard. The proposal combines sensors, software and data visualization to support collection decisions.",
  "smartWaste.factContextValue": "Integrative Project · SPTech",
  "smartWaste.factRole": "My contribution",
  "smartWaste.factRoleValue": "Dashboard, API and SQL queries",
  "smartWaste.factExploration": "Exploration",
  "smartWaste.factExplorationValue": "Software, sensors and data",
  "smartWaste.coverCaption":
    "Project dashboard: containers and their readings brought together in a monitoring interface. Original interface in Portuguese.",
  "smartWaste.contextHeading": "Monitor the volume.",
  "smartWaste.contextHeadingEmphasis": "Give collection decisions context.",
  "smartWaste.contextLead":
    "How can container fill levels be made visible to support the decision to request a collection?",
  "smartWaste.contextProposal":
    "This question guides Smart Waste. The Integrative Project documentation, dated March 2026, presents a proposed solution to monitor hospital waste volume and organize the information for the people responsible.",
  "smartWaste.contextScope":
    "The scope focused on monitoring. Waste type is entered manually; fill-level measurements do not identify the material. Collection operations, transportation and integration with waste disposal companies were outside the scope.",
  "smartWaste.processHeading": "Build a path",
  "smartWaste.processHeadingEmphasis": "from readings to information.",
  "smartWaste.processScopeTitle": "Define the scope",
  "smartWaste.processScopeBody":
    "Planning covered requirements, environment setup, version control and architecture. Choosing what to monitor helped distinguish system functions from collection operations.",
  "smartWaste.processComponentsTitle": "Connect the components",
  "smartWaste.processComponentsBody":
    "The proposal connects Arduino and an ultrasonic sensor with data modeling and web interfaces. The documentation organizes development into preparation, integration, and review with testing.",
  "smartWaste.processFailuresTitle": "Anticipate failures",
  "smartWaste.processFailuresBody":
    "Measurement inaccuracy, connection problems and inconsistent records are identified as project risks. These points guide what needs attention when validating the solution.",
  "smartWaste.productHeading": "Readings that can",
  "smartWaste.productHeadingEmphasis": "be monitored.",
  "smartWaste.productIntro":
    "The dashboard organizes queries by container, waste type and alert status.",
  "smartWaste.productStatusTitle": "Check the status",
  "smartWaste.productStatusBody":
    "Indicators and a container list bring together the status reported by the system. Filters help focus queries on a waste type or warning status.",
  "smartWaste.productHistoryTitle": "Explore the history",
  "smartWaste.productHistoryBody":
    "The chart shows readings over time. Selecting a bin lets users follow its records and observe changes in its fill level.",
  "smartWaste.productAlertsTitle": "Track alerts",
  "smartWaste.productAlertsBody":
    "The code includes routines to record and count alerts. The dashboard combines this information with the warning thresholds defined in the prototype.",
  "smartWaste.loginCaption":
    "Login screen recorded in the Integrative Project documentation. Original interface in Portuguese.",
  "smartWaste.registrationCaption":
    "Registration screen presented in the same academic document. Original interface in Portuguese.",
  "smartWaste.technologyHeading": "Software, sensors",
  "smartWaste.technologyHeadingEmphasis": "and their connections.",
  "smartWaste.technologyStack":
    "The web application uses Node.js and Express to organize routes, with MySQL access through mysql2. The interface uses HTML, CSS and JavaScript, while Chart.js displays the readings as charts.",
  "smartWaste.technologyRepository":
    "The repository shows how reading queries, filters, history and alert recording work. The proposed use of Arduino and an ultrasonic sensor to acquire measurements appears in the project architecture materials.",
  "smartWaste.technologyContribution":
    "My contribution focused on extending the dashboard functionality: API and MySQL integration, history by container, filters, charts and alert routines. The initial dashboard and other components were built by the team.",
  "smartWaste.htmlCss": "HTML and CSS",
  "smartWaste.contributionsTitle": "Selected contributions",
  "smartWaste.contributionsIntro":
    "The examples below show a selection of my contributions. I also reviewed my teammates’ code during development.",
  "smartWaste.contributionIntegrationTitle": "Dashboard integration",
  "smartWaste.contributionIntegrationBody":
    "I connected the dashboard interface to MySQL data through a dedicated layer of routes, controllers and models in Node.js/Express. On the client, I implemented requests and card rendering from API responses, including queries for all containers, warning states and critical states.",
  "smartWaste.evidenceIntegration": "Interface, routes and queries",
  "smartWaste.evidenceIntegrationContext":
    "— commit 327a649 (opens in a new tab)",
  "smartWaste.contributionHistoryTitle": "History by container",
  "smartWaste.contributionHistoryBody":
    "I worked on SQL views that separate the latest reading from each bin’s history. I also connected container selection to the preparation of the values and timestamps displayed in the Chart.js chart.",
  "smartWaste.evidenceHistory": "Reading and history views",
  "smartWaste.evidenceHistoryContext": "— commit cabdfc0 (opens in a new tab)",
  "smartWaste.evidenceSelection": "Bin selection and chart",
  "smartWaste.evidenceSelectionContext":
    "— commit e561088 (opens in a new tab)",
  "smartWaste.contributionFiltersTitle": "Filters connected to the data",
  "smartWaste.contributionFiltersBody":
    "I carried waste-type selection from the interface through to the query used by the chart, adding the corresponding route, controller and SQL filter. The selection then determined which records were displayed.",
  "smartWaste.evidenceFilter": "Chart filter by waste type",
  "smartWaste.evidenceFilterContext": "— commit ed3bacc (opens in a new tab)",
  "smartWaste.contributionAlertsTitle": "Alerts and indicators",
  "smartWaste.contributionAlertsBody":
    "I implemented routines to record and count alerts, associate occurrences with readings and update the dashboard indicator. I also worked on counters by waste type and on displaying the states defined in the prototype.",
  "smartWaste.evidenceAlerts": "Alert recording and counts",
  "smartWaste.evidenceAlertsContext": "— commit fd9282c (opens in a new tab)",
  "smartWaste.evidenceIndicators": "Dashboard indicators",
  "smartWaste.evidenceIndicatorsContext":
    "— commit 4e91d24 (opens in a new tab)",
  "smartWaste.lessonsHeading": "Information depends",
  "smartWaste.lessonsHeadingEmphasis": "on the path that produces it.",
  "smartWaste.lessonsLead":
    "A dashboard’s usefulness starts at the source of a reading and continues through the way it is presented.",
  "smartWaste.lessonsConnections":
    "Smart Waste connects decisions about measurement, container association, storage and queries. The work also highlights the importance of defining the scope and considering how the system behaves when a reading or connection fails.",
  "smartWaste.lessonsNextSteps":
    "Further work could document tests of physical integration, measurement accuracy, data updates and alert behavior. The documentation presents cost reduction and operational improvements as objectives; this case study does not claim measured results for them.",
  "smartWaste.sourceIntro":
    "Sources for this study: Smart Waste Integrative Project documentation, SPTech, March 2026, and the",
  "smartWaste.sourceRepository": "project repository",
  "smartWaste.sourceImages":
    ". The login and registration screens are taken from the document; the dashboard screenshot and both diagrams were supplied separately by the author.",
  "smartWaste.nextHeading": "Other ways",
  "smartWaste.nextHeadingEmphasis": "to build connections.",
  "smartWaste.nextBody":
    "For INTEA, the challenge centered on social interaction and community. You can explore that case study too, or talk with me about the projects.",
  "smartWaste.nextIntea": "Explore INTEA",
  "smartWaste.solutionDialogTitle": "Solution diagram · Smart Waste",
  "smartWaste.technicalDialogTitle": "Technical diagram · Smart Waste",
  "smartWaste.description":
    "Smart Waste case study: scope, volume monitoring, dashboard and architecture of an academic software and sensor project at SPTech.",
  "smartWaste.metaTitle": "Smart Waste — Case study · Matheus Maceu",
  "smartWaste.metaSummary":
    "How a proposal to monitor hospital waste containers was organized into data, charts and alerts. A team project at SPTech.",
  "smartWaste.metaImageAlt":
    "Smart Waste dashboard with indicators, a chart and container monitoring. Original interface in Portuguese.",
  "smartWaste.metaLocale": "en_US",
  "smartWaste.coverAlt":
    "Smart Waste dashboard with waste indicators, a volume chart and a list of containers with warning states. Original interface in Portuguese.",
  "smartWaste.loginAlt":
    "Smart Waste login screen with empty fields for system access. Original interface in Portuguese.",
  "smartWaste.registrationAlt":
    "Smart Waste registration screen with an account creation form and empty fields. Original interface in Portuguese.",
  "smartWaste.techLabel": "Smart Waste project technologies",
  "smartWaste.solutionAlt":
    "Smart Waste solution diagram connecting the sensor, Arduino, containers, storage, alerts and management dashboard. Original diagram in Portuguese.",
  "smartWaste.technicalAlt":
    "Smart Waste technical diagram with collection, Arduino, API, processing, database, dashboard, alerts and the responsible team. Original diagram in Portuguese.",
  "smartWaste.closeSolution": "Close solution diagram",
  "smartWaste.closeTechnical": "Close technical diagram",
};
