import React, { lazy } from 'react';
import { RouteProps } from 'react-router-dom';
import {
	componentPagesMenu,
	dashboardPagesMenu,
	demoPagesMenu,
	gettingStartedPagesMenu,
	pageLayoutTypesPagesMenu,
} from '../menu';
import Login from '../pages/presentation/auth/Login';

const LANDING = {
	DASHBOARD: lazy(() => import('../pages/presentation/dashboard/DashboardPage')),
	DASHBOARD_BOOKING: lazy(() => import('../pages/presentation/dashboard/DashboardBookingPage')),
	SUMMARY: lazy(() => import('../pages/presentation/SummaryPage')),
};

const EL_DASHBOARD = {
	EL_DASHBOARD: lazy(() => import('../pages/presentation/e-learning/dashboard/Dashboard')),
};

const EMPLOYEE = {
	EMPLOYEE_PAGE: lazy(() => import('../pages/presentation/e-learning/staff/staff')),
};

const MANAGEMENT = {
	CATEGORY: {
		CATEGORY_MANAGEMENT: lazy(
			() => import('../pages/presentation/e-learning/management/category/categoryList'),
		),
		CATEGORY_PAGE: lazy(
			() => import('../pages/presentation/e-learning/management/category/category'),
		),
	},
	// module
	MODULE: {
		MODULE_MANAGEMENT: lazy(
			() => import('../pages/presentation/e-learning/management/module/moduleList'),
		),
		MODULE_PAGE: lazy(
			() => import('../pages/presentation/e-learning/management/module/module'),
		),
	},
	// USERS
	USERS: {
		USERS_MANAGEMENT: lazy(
			() => import('../pages/presentation/e-learning/management/users/usersList'),
		),
		USERS_PAGE: lazy(() => import('../pages/presentation/e-learning/management/users/users')),
	},
	// Participants
	PARTICIPANTS: {
		PARTICIPANTS_MANAGEMENT: lazy(
			() =>
				import('../pages/presentation/e-learning/management/participant/participantsList'),
		),
		PARTICIPANTS_PAGE: lazy(
			() => import('../pages/presentation/e-learning/management/participant/participants'),
		),
	},
	// feedback
	FEEDBACK: {
		FEEDBACK_MANAGEMENT: lazy(
			() => import('../pages/presentation/e-learning/management/feedback/feedbackList'),
		),
		FEEDBACK_PAGE: lazy(
			() => import('../pages/presentation/e-learning/management/feedback/feedback'),
		),
	},
	// enrollment
	ENROLLMENT: {
		ENROLLMENT_MANAGEMENT: lazy(
			() => import('../pages/presentation/e-learning/management/enrollment/enrollmentList'),
		),
		ENROLLMENT_PAGE: lazy(
			() => import('../pages/presentation/e-learning/management/enrollment/enrollment'),
		),
	},
};

const ADMIN_USER = {
	ADMIN_USER_MANAGEMENT: lazy(
		() => import('../pages/presentation/e-learning/adminUser/adminUserList'),
	),
	ADMIN_USER_PAGE: lazy(() => import('../pages/presentation/e-learning/adminUser/adminUser')),
};

const ACCESS_CONTROLL = {
	ACCESS_CONTROLL_PAGE: lazy(
		() => import('../pages/presentation/e-learning/accessControll/accessControllPage'),
	),
};

const AUDIT_LOGS = {
	AUDIT_LOGS_PAGE: lazy(() => import('../pages/presentation/e-learning/auditLogs/auditLogs')),
};

const THIRD_PARTY_INTIGRATION = {
	THIRD_PARTY_INTIGRATION_PAGE: lazy(
		() =>
			import('../pages/presentation/e-learning/thirdPartyIntigration/thirdPartyIntigration'),
	),
};

const SINGLE = {
	BOXED: lazy(() => import('../pages/presentation/single-pages/SingleBoxedPage')),
	FLUID: lazy(() => import('../pages/presentation/single-pages/SingleFluidPage')),
};
const LIST = {
	BOXED: lazy(() => import('../pages/presentation/demo-pages/ListBoxedPage')),
	FLUID: lazy(() => import('../pages/presentation/demo-pages/ListFluidPage')),
};
const GRID = {
	BOXED: lazy(() => import('../pages/presentation/demo-pages/GridBoxedPage')),
	FLUID: lazy(() => import('../pages/presentation/demo-pages/GridFluidPage')),
};
const EDIT = {
	MODERN: lazy(() => import('../pages/presentation/demo-pages/EditModernPage')),
	BOXED: lazy(() => import('../pages/presentation/demo-pages/EditBoxedPage')),
	FLUID: lazy(() => import('../pages/presentation/demo-pages/EditFluidPage')),
	WIZARD: lazy(() => import('../pages/presentation/demo-pages/EditWizardPage')),
	IN_CANVAS: lazy(() => import('../pages/presentation/demo-pages/EditInCanvasPage')),
	IN_MODAL: lazy(() => import('../pages/presentation/demo-pages/EditInModalPage')),
};
const PRICING = {
	PRICING_TABLE: lazy(() => import('../pages/presentation/pricing/PricingTablePage')),
};

const AUTH = {
	PAGE_404: lazy(() => import('../pages/presentation/auth/Page404')),
};
const APP = {
	PROJECT_MANAGEMENT: {
		PROJECTS_LIST: lazy(
			() => import('../pages/presentation/project-management/ProjectManagementsList'),
		),
		PROJECT: lazy(
			() => import('../pages/presentation/project-management/ProjectManagementsProject'),
		),
	},
	KNOWLEDGE: {
		GRID: lazy(() => import('../pages/presentation/knowledge/KnowledgeGridPage')),
		VIEW: lazy(() => import('../pages/presentation/knowledge/KnowledgeViewPage')),
	},
	SALES: {
		TRANSACTIONS: lazy(() => import('../pages/presentation/sales/TransActionsPage')),
		PRODUCTS: lazy(() => import('../pages/presentation/sales/SalesListPage')),
		PRODUCTS_GRID: lazy(() => import('../pages/presentation/sales/ProductsGridPage')),
		PRODUCTS_VIEW: lazy(() => import('../pages/presentation/sales/ProductViewPage')),
	},
	APPOINTMENT: {
		CALENDAR: lazy(() => import('../pages/presentation/appointment/CalendarPage')),
		EMPLOYEE_LIST: lazy(() => import('../pages/presentation/appointment/EmployeeList')),
		EMPLOYEE_VIEW: lazy(() => import('../pages/presentation/appointment/EmployeePage')),
		APPOINTMENT_LIST: lazy(() => import('../pages/presentation/appointment/AppointmentList')),
	},
	CRM: {
		CRM_DASHBOARD: lazy(() => import('../pages/presentation/crm/CrmDashboard')),
		CUSTOMERS: lazy(() => import('../pages/presentation/crm/CustomersList')),
		CUSTOMER: lazy(() => import('../pages/presentation/crm/Customer')),
	},
	CHAT: {
		WITH_LIST: lazy(() => import('../pages/presentation/chat/WithListChatPage')),
		ONLY_LIST: lazy(() => import('../pages/presentation/chat/OnlyListChatPage')),
	},
};
const PAGE_LAYOUTS = {
	HEADER_SUBHEADER: lazy(() => import('../pages/presentation/page-layouts/HeaderAndSubheader')),
	HEADER: lazy(() => import('../pages/presentation/page-layouts/OnlyHeader')),
	SUBHEADER: lazy(() => import('../pages/presentation/page-layouts/OnlySubheader')),
	CONTENT: lazy(() => import('../pages/presentation/page-layouts/OnlyContent')),
	BLANK: lazy(() => import('../pages/presentation/page-layouts/Blank')),
	ASIDE: lazy(() => import('../pages/presentation/aside-types/DefaultAsidePage')),
	MINIMIZE_ASIDE: lazy(() => import('../pages/presentation/aside-types/MinimizeAsidePage')),
};

const CONTENT = {
	CONTENTS: lazy(() => import('../pages/documentation/content/ContentListPage')),
	TYPOGRAPHY: lazy(() => import('../pages/documentation/content/TypographyPage')),
	IMAGES: lazy(() => import('../pages/documentation/content/ImagesPage')),
	TABLES: lazy(() => import('../pages/documentation/content/TablesPage')),
	FIGURES: lazy(() => import('../pages/documentation/content/FiguresPage')),
};
const FORMS_PAGE = {
	FORMS: lazy(() => import('../pages/documentation/forms/FormsListPage')),
	FORM_GROUP: lazy(() => import('../pages/documentation/forms/FormGroupPage')),
	FORM_CONTROLS: lazy(() => import('../pages/documentation/forms/FormControlsPage')),
	SELECT: lazy(() => import('../pages/documentation/forms/SelectPage')),
	CHECKS_AND_RADIO: lazy(() => import('../pages/documentation/forms/ChecksAndRadioPage')),
	RANGE: lazy(() => import('../pages/documentation/forms/RangePage')),
	INPUT_GROUP: lazy(() => import('../pages/documentation/forms/InputGroupPage')),
	VALIDATION: lazy(() => import('../pages/documentation/forms/ValidationPage')),
	WIZARD: lazy(() => import('../pages/documentation/forms/WizardPage')),
};
const GETTING_STARTED = {
	INSTALLATION: lazy(() => import('../pages/documentation/getting-started/InstallationPage')),
	DEVELOPMENT: lazy(() => import('../pages/documentation/getting-started/DevelopmentPage')),
	FOLDER: lazy(() => import('../pages/documentation/getting-started/FolderStructurePage')),
	BOOTSTRAP: lazy(() => import('../pages/documentation/getting-started/BootstrapVariablesPage')),
	PROJECT: lazy(() => import('../pages/documentation/getting-started/ProjectStructurePage')),
};
const ROUTES = {
	ROUTER: lazy(() => import('../pages/documentation/routes/RouterPage')),
};
const COMPONENTS_PAGE = {
	COMPONENTS: lazy(() => import('../pages/documentation/components/ComponentsListPage')),
	ACCORDION: lazy(() => import('../pages/documentation/components/AccordionPage')),
	ALERT: lazy(() => import('../pages/documentation/components/AlertPage')),
	BADGE: lazy(() => import('../pages/documentation/components/BadgePage')),
	BREADCRUMB: lazy(() => import('../pages/documentation/components/BreadcrumbPage')),
	BUTTON: lazy(() => import('../pages/documentation/components/ButtonPage')),
	BUTTON_GROUP: lazy(() => import('../pages/documentation/components/ButtonGroupPage')),
	CARD: lazy(() => import('../pages/documentation/components/CardPage')),
	CAROUSEL: lazy(() => import('../pages/documentation/components/CarouselPage')),
	COLLAPSE: lazy(() => import('../pages/documentation/components/CollapsePage')),
	DROPDOWN: lazy(() => import('../pages/documentation/components/DropdownsPage')),
	LIST_GROUP: lazy(() => import('../pages/documentation/components/ListGroupPage')),
	MODAL: lazy(() => import('../pages/documentation/components/ModalPage')),
	NAVS_TABS: lazy(() => import('../pages/documentation/components/NavsTabsPage')),
	OFF_CANVAS: lazy(() => import('../pages/documentation/components/OffCanvasPage')),
	PAGINATION: lazy(() => import('../pages/documentation/components/PaginationPage')),
	POPOVERS: lazy(() => import('../pages/documentation/components/PopoversPage')),
	PROGRESS: lazy(() => import('../pages/documentation/components/ProgressPage')),
	SCROLLSPY: lazy(() => import('../pages/documentation/components/ScrollspyPage')),
	SPINNER: lazy(() => import('../pages/documentation/components/SpinnersPage')),
	TABLE: lazy(() => import('../pages/documentation/components/TablePage')),
	TOASTS: lazy(() => import('../pages/documentation/components/ToastsPage')),
	TOOLTIP: lazy(() => import('../pages/documentation/components/TooltipPage')),
};
const UTILITIES = {
	UTILITIES: lazy(() => import('../pages/documentation/utilities/UtilitiesListPage')),
	API: lazy(() => import('../pages/documentation/utilities/ApiPage')),
	BACKGROUND: lazy(() => import('../pages/documentation/utilities/BackgroundPage')),
	BORDERS: lazy(() => import('../pages/documentation/utilities/BordersPage')),
	COLORS: lazy(() => import('../pages/documentation/utilities/ColorsPage')),
	DISPLAY: lazy(() => import('../pages/documentation/utilities/DisplayPage')),
	FLEX: lazy(() => import('../pages/documentation/utilities/FlexPage')),
	FLOAT: lazy(() => import('../pages/documentation/utilities/FloatPage')),
	INTERACTIONS: lazy(() => import('../pages/documentation/utilities/InteractionsPage')),
	OVERFLOW: lazy(() => import('../pages/documentation/utilities/OverflowPage')),
	POSITION: lazy(() => import('../pages/documentation/utilities/PositionPage')),
	SHADOWS: lazy(() => import('../pages/documentation/utilities/ShadowsPage')),
	SIZING: lazy(() => import('../pages/documentation/utilities/SizingPage')),
	SPACING: lazy(() => import('../pages/documentation/utilities/SpacingPage')),
	TEXT: lazy(() => import('../pages/documentation/utilities/TextPage')),
	VERTICAL_ALIGN: lazy(() => import('../pages/documentation/utilities/VerticalAlignPage')),
	VISIBILITY: lazy(() => import('../pages/documentation/utilities/VisibilityPage')),
};
const ICONS = {
	ICONS_LIST: lazy(() => import('../pages/documentation/icons/IconsListPage')),
	ICON: lazy(() => import('../pages/documentation/icons/IconPage')),
	MATERIAL: lazy(() => import('../pages/documentation/icons/MaterialPage')),
};
const CHARTS_PAGE = {
	CHART_LIST: lazy(() => import('../pages/documentation/charts/ChartsListPage')),
	GENERAL_USAGE: lazy(() => import('../pages/documentation/charts/ChartGeneralUsagePage')),
	SPARKLINE: lazy(() => import('../pages/documentation/charts/ChartSparklinePage')),
	LINE: lazy(() => import('../pages/documentation/charts/ChartLinePage')),
	AREA: lazy(() => import('../pages/documentation/charts/ChartAreaPage')),
	COLUMN: lazy(() => import('../pages/documentation/charts/ChartColumnPage')),
	BAR: lazy(() => import('../pages/documentation/charts/ChartBarPage')),
	MIXED: lazy(() => import('../pages/documentation/charts/ChartMixedPage')),
	TIMELINE: lazy(() => import('../pages/documentation/charts/ChartTimelinePage')),
	CANDLESTICK: lazy(() => import('../pages/documentation/charts/ChartCandlestickPage')),
	BOX_WHISKER: lazy(() => import('../pages/documentation/charts/ChartBoxWhiskerPage')),
	PIE_DONUT: lazy(() => import('../pages/documentation/charts/ChartPieDonutPage')),
	RADAR: lazy(() => import('../pages/documentation/charts/ChartRadarPage')),
	POLAR: lazy(() => import('../pages/documentation/charts/ChartPolarPage')),
	RADIAL_BAR: lazy(() => import('../pages/documentation/charts/ChartRadialBarPage')),
	BUBBLE: lazy(() => import('../pages/documentation/charts/ChartBubblePage')),
	SCATTER: lazy(() => import('../pages/documentation/charts/ChartScatterPage')),
	HEAT_MAP: lazy(() => import('../pages/documentation/charts/ChartHeatMapPage')),
	TREE_MAP: lazy(() => import('../pages/documentation/charts/ChartTreeMapPage')),
};
const EXTRA = {
	NOTIFICATION: lazy(() => import('../pages/documentation/extras/NotificationPage')),
	HOOKS: lazy(() => import('../pages/documentation/extras/HooksPage')),
};

const presentation: RouteProps[] = [
	/**
	 * Landing
	 */
	{
		path: 'null',
		element: <LANDING.DASHBOARD />,
	},
	{
		path: 'null',
		element: <LANDING.DASHBOARD_BOOKING />,
	},
	{
		path: 'null',
		element: <LANDING.SUMMARY />,
	},

	/** ************************************************** */

	/**
	 * Pages
	 */

	/**
	 * e learning pages *********************************
	 */

	/**
	 * dashboard
	 */
	{
		path: dashboardPagesMenu.dashboard.path,
		element: <EL_DASHBOARD.EL_DASHBOARD />,
	},
	/**
	 * dashboard
	 */
	{
		path: '/employee-page/:id',
		element: <EMPLOYEE.EMPLOYEE_PAGE />,
	},
	/**
	 * Management
	 */
	{
		path: dashboardPagesMenu.courseManagement.path,
		element: <MANAGEMENT.CATEGORY.CATEGORY_MANAGEMENT />,
	},
	{
		path: `${dashboardPagesMenu.courseManagement.path}/course/:id`,
		element: <MANAGEMENT.CATEGORY.CATEGORY_PAGE />,
	},
	/* 
	Module management
	*/
	{
		path: dashboardPagesMenu.curriculumManagement.path,
		element: <MANAGEMENT.MODULE.MODULE_MANAGEMENT />,
	},
	{
		path: `${dashboardPagesMenu.curriculumManagement.path}/curriculum/:id`,
		element: <MANAGEMENT.MODULE.MODULE_PAGE />,
	},
	// users management
	// */
	{
		path: dashboardPagesMenu.usersManagement.path,
		element: <MANAGEMENT.USERS.USERS_MANAGEMENT />,
	},
	{
		path: `${dashboardPagesMenu.usersManagement.path}/users/:id`,
		element: <MANAGEMENT.USERS.USERS_PAGE />,
	},
	// PARTICIPANTS management
	// */
	{
		path: dashboardPagesMenu.participantManagement.path,
		element: <MANAGEMENT.PARTICIPANTS.PARTICIPANTS_MANAGEMENT />,
	},
	{
		path: `${dashboardPagesMenu.participantManagement.path}/participant/:id`,
		element: <MANAGEMENT.PARTICIPANTS.PARTICIPANTS_PAGE />,
	},
	// feedback management
	// */
	{
		path: dashboardPagesMenu.feedbackManagement.path,
		element: <MANAGEMENT.FEEDBACK.FEEDBACK_MANAGEMENT />,
	},
	{
		path: `${dashboardPagesMenu.feedbackManagement.path}/feedback/:id`,
		element: <MANAGEMENT.FEEDBACK.FEEDBACK_PAGE />,
	},
	// enrollment management
	// */
	{
		path: dashboardPagesMenu.enrollmentManagement.path,
		element: <MANAGEMENT.ENROLLMENT.ENROLLMENT_MANAGEMENT />,
	},
	{
		path: `${dashboardPagesMenu.enrollmentManagement.path}/enrollment/:id`,
		element: <MANAGEMENT.ENROLLMENT.ENROLLMENT_PAGE />,
	},
	// userAdmin management
	// */
	// {
	// 	path: dashboardPagesMenu.adminUser.path,
	// 	element: <ADMIN_USER.ADMIN_USER_MANAGEMENT />,
	// },
	// {
	// 	path: `${dashboardPagesMenu.adminUser.path}/adminsUser/:id`,
	// 	element: <ADMIN_USER.ADMIN_USER_PAGE />,
	// },
	// userAdmin management
	// */
	{
		path: dashboardPagesMenu.accessControl.path,
		element: <ACCESS_CONTROLL.ACCESS_CONTROLL_PAGE />,
	},
	// AUDIT LOGS management
	// */
	// {
	// 	path: dashboardPagesMenu.auditLogs.path,
	// 	element: <AUDIT_LOGS.AUDIT_LOGS_PAGE />,
	// },
	// userAdmin management
	// */
	// {
	// 	path: dashboardPagesMenu.thirdPartyIntigration.path,
	// 	element: <THIRD_PARTY_INTIGRATION.THIRD_PARTY_INTIGRATION_PAGE />,
	// },

	/**
	 * Single Pages
	 */
	{
		path: 'null',
		//  demoPagesMenu.singlePages.subMenu.boxedSingle.path,
		element: <SINGLE.BOXED />,
	},
	{
		path: 'null',
		// demoPagesMenu.singlePages.subMenu.fluidSingle.path,
		element: <SINGLE.FLUID />,
	},

	/**
	 * List
	 */
	{
		// path: demoPagesMenu.listPages.subMenu.listBoxed.path,
		path: 'null',
		element: <LIST.BOXED />,
	},
	{
		path: 'null',
		// path: demoPagesMenu.listPages.subMenu.listFluid.path,
		element: <LIST.FLUID />,
	},

	/**
	 * Grid
	 */
	{
		path: 'null',
		// path: demoPagesMenu.gridPages.subMenu.gridBoxed.path,
		element: <GRID.BOXED />,
	},
	{
		path: 'null',
		// path: demoPagesMenu.gridPages.subMenu.gridFluid.path,
		element: <GRID.FLUID />,
	},

	/**
	 * Edit
	 */
	{
		path: 'null',
		// path: demoPagesMenu.editPages.subMenu.editModern.path,
		element: <EDIT.MODERN />,
	},
	{
		path: 'null',
		// path: demoPagesMenu.editPages.subMenu.editBoxed.path,
		element: <EDIT.BOXED />,
	},
	{
		path: 'null',
		// path: demoPagesMenu.editPages.subMenu.editFluid.path,
		element: <EDIT.FLUID />,
	},
	{
		path: 'null',
		// path: demoPagesMenu.editPages.subMenu.editWizard.path,
		element: <EDIT.WIZARD />,
	},
	{
		path: 'null',
		// path: demoPagesMenu.editPages.subMenu.editInCanvas.path,
		element: <EDIT.IN_CANVAS />,
	},
	{
		path: 'null',
		// path: demoPagesMenu.editPages.subMenu.editInModal.path,
		element: <EDIT.IN_MODAL />,
	},

	{
		path: 'null',
		// path: demoPagesMenu.pricingTable.path,
		element: <PRICING.PRICING_TABLE />,
	},

	/**
	 * END - Pages
	 */

	/**
	 * Auth Page
	 */
	{
		path: 'null',
		// path: demoPagesMenu.page404.path,
		element: <AUTH.PAGE_404 />,
	},
	{
		// path: 'null',
		path: demoPagesMenu.login.path,
		element: <Login />,
	},
	{
		path: 'null',
		// path: demoPagesMenu.signUp.path,
		element: <Login isSignUp />,
	},

	/**
	 * App
	 */

	/**
	 * App > Project Management
	 */
	{
		path: 'null',
		// path: demoPagesMenu.projectManagement.subMenu.list.path,
		element: <APP.PROJECT_MANAGEMENT.PROJECTS_LIST />,
	},
	{
		path: `${demoPagesMenu.projectManagement.subMenu.itemID.path}/:id`,
		element: <APP.PROJECT_MANAGEMENT.PROJECT />,
	},

	/**
	 * App > Knowledge
	 */
	{
		path: 'null',
		// path: demoPagesMenu.knowledge.subMenu.grid.path,
		element: <APP.KNOWLEDGE.GRID />,
	},
	{
		path: `${demoPagesMenu.knowledge.subMenu.itemID.path}/:id`,
		element: <APP.KNOWLEDGE.VIEW />,
	},

	/**
	 * App > Sales
	 */
	{
		path: 'null',
		// path: demoPagesMenu.sales.subMenu.transactions.path,
		element: <APP.SALES.TRANSACTIONS />,
	},
	{
		path: 'null',
		// path: demoPagesMenu.sales.subMenu.salesList.path,
		element: <APP.SALES.PRODUCTS />,
	},
	{
		path: 'null',
		// path: demoPagesMenu.sales.subMenu.productsGrid.path,
		element: <APP.SALES.PRODUCTS_GRID />,
	},
	{
		path: `${demoPagesMenu.sales.subMenu.productID.path}/:id`,
		element: <APP.SALES.PRODUCTS_VIEW />,
	},

	/**
	 * App > Appointment
	 */
	{
		path: 'null',
		// path: demoPagesMenu.appointment.subMenu.calendar.path,
		element: <APP.APPOINTMENT.CALENDAR />,
	},
	{
		path: 'null',
		// path: demoPagesMenu.appointment.subMenu.employeeList.path,
		element: <APP.APPOINTMENT.EMPLOYEE_LIST />,
	},
	{
		path: `${demoPagesMenu.appointment.subMenu.employeeID.path}/:id`,
		element: <APP.APPOINTMENT.EMPLOYEE_VIEW />,
	},
	{
		path: 'null',
		// path: demoPagesMenu.appointment.subMenu.appointmentList.path,
		element: <APP.APPOINTMENT.APPOINTMENT_LIST />,
	},

	/**
	 * App > CRM
	 */
	{
		path: 'null',
		// path: demoPagesMenu.crm.subMenu.dashboard.path,
		element: <APP.CRM.CRM_DASHBOARD />,
	},
	{
		path: 'null',
		// path: demoPagesMenu.crm.subMenu.customersList.path,
		element: <APP.CRM.CUSTOMERS />,
	},
	{
		path: 'null',
		// path: `${demoPagesMenu.crm.subMenu.customerID.path}/:id`,
		element: <APP.CRM.CUSTOMER />,
	},

	/**
	 * App > Chat
	 */
	{
		path: 'null',
		// path: demoPagesMenu.chat.subMenu.withListChat.path,
		element: <APP.CHAT.WITH_LIST />,
	},
	{
		path: 'null',
		// path: demoPagesMenu.chat.subMenu.onlyListChat.path,
		element: <APP.CHAT.ONLY_LIST />,
	},

	/**
	 * END - App
	 */

	/** ************************************************** */

	/**
	 * Page Layout Types
	 */
	{
		path: 'null',
		// path: pageLayoutTypesPagesMenu.blank.path,
		element: <PAGE_LAYOUTS.BLANK />,
	},
	{
		path: 'null',
		// path: pageLayoutTypesPagesMenu.pageLayout.subMenu.headerAndSubheader.path,
		element: <PAGE_LAYOUTS.HEADER_SUBHEADER />,
	},
	{
		path: 'null',
		// path: pageLayoutTypesPagesMenu.pageLayout.subMenu.onlyHeader.path,
		element: <PAGE_LAYOUTS.HEADER />,
	},
	{
		path: 'null',
		// path: pageLayoutTypesPagesMenu.pageLayout.subMenu.onlySubheader.path,
		element: <PAGE_LAYOUTS.SUBHEADER />,
	},
	{
		path: 'null',
		// path: pageLayoutTypesPagesMenu.pageLayout.subMenu.onlyContent.path,
		element: <PAGE_LAYOUTS.CONTENT />,
	},
	{
		path: 'null',
		// path: pageLayoutTypesPagesMenu.asideTypes.subMenu.defaultAside.path,
		element: <PAGE_LAYOUTS.ASIDE />,
	},
	{
		path: 'null',
		// path: pageLayoutTypesPagesMenu.asideTypes.subMenu.minimizeAside.path,
		element: <PAGE_LAYOUTS.MINIMIZE_ASIDE />,
	},
];
const documentation: RouteProps[] = [
	/**
	 * Getting Started
	 */
	{
		path: 'null',
		// path: gettingStartedPagesMenu.gettingStarted.subMenu.installation.path,
		element: <GETTING_STARTED.INSTALLATION />,
	},
	{
		path: 'null',
		// path: gettingStartedPagesMenu.gettingStarted.subMenu.dev.path,
		element: <GETTING_STARTED.DEVELOPMENT />,
	},
	{
		path: 'null',
		// path: gettingStartedPagesMenu.gettingStarted.subMenu.folderStructure.path,
		element: <GETTING_STARTED.FOLDER />,
	},
	{
		path: 'null',
		// path: gettingStartedPagesMenu.gettingStarted.subMenu.bootstrapVariables.path,
		element: <GETTING_STARTED.BOOTSTRAP />,
	},
	{
		path: 'null',
		// path: gettingStartedPagesMenu.gettingStarted.subMenu.projectStructure.path,
		element: <GETTING_STARTED.PROJECT />,
	},
	/**
	 * Routes
	 */
	{
		path: 'null',
		// path: gettingStartedPagesMenu.routes.subMenu.router.path,
		element: <ROUTES.ROUTER />,
	},
	/**
	 * Bootstrap
	 */

	/**
	 * Content
	 */
	{
		path: 'null',
		// path: componentPagesMenu.content.path,
		element: <CONTENT.CONTENTS />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.content.subMenu.typography.path,
		element: <CONTENT.TYPOGRAPHY />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.content.subMenu.images.path,
		element: <CONTENT.IMAGES />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.content.subMenu.tables.path,
		element: <CONTENT.TABLES />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.content.subMenu.figures.path,
		element: <CONTENT.FIGURES />,
	},

	/**
	 * Forms
	 */
	{
		path: 'null',
		// path: componentPagesMenu.forms.path,
		element: <FORMS_PAGE.FORMS />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.forms.subMenu.formGroup.path,
		element: <FORMS_PAGE.FORM_GROUP />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.forms.subMenu.formControl.path,
		element: <FORMS_PAGE.FORM_CONTROLS />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.forms.subMenu.select.path,
		element: <FORMS_PAGE.SELECT />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.forms.subMenu.checksAndRadio.path,
		element: <FORMS_PAGE.CHECKS_AND_RADIO />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.forms.subMenu.range.path,
		element: <FORMS_PAGE.RANGE />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.forms.subMenu.inputGroup.path,
		element: <FORMS_PAGE.INPUT_GROUP />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.forms.subMenu.validation.path,
		element: <FORMS_PAGE.VALIDATION />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.forms.subMenu.wizard.path,
		element: <FORMS_PAGE.WIZARD />,
	},

	/**
	 * Components
	 */
	{
		path: 'null',
		// path: componentPagesMenu.components.path,
		element: <COMPONENTS_PAGE.COMPONENTS />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.components.subMenu.tooltip.path,
		element: <COMPONENTS_PAGE.TOOLTIP />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.components.subMenu.toasts.path,
		element: <COMPONENTS_PAGE.TOASTS />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.components.subMenu.scrollspy.path,
		element: <COMPONENTS_PAGE.SCROLLSPY />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.components.subMenu.carousel.path,
		element: <COMPONENTS_PAGE.CAROUSEL />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.components.subMenu.spinners.path,
		element: <COMPONENTS_PAGE.SPINNER />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.components.subMenu.listGroup.path,
		element: <COMPONENTS_PAGE.LIST_GROUP />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.components.subMenu.breadcrumb.path,
		element: <COMPONENTS_PAGE.BREADCRUMB />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.components.subMenu.collapse.path,
		element: <COMPONENTS_PAGE.COLLAPSE />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.components.subMenu.pagination.path,
		element: <COMPONENTS_PAGE.PAGINATION />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.components.subMenu.progress.path,
		element: <COMPONENTS_PAGE.PROGRESS />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.components.subMenu.card.path,
		element: <COMPONENTS_PAGE.CARD />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.components.subMenu.button.path,
		element: <COMPONENTS_PAGE.BUTTON />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.components.subMenu.buttonGroup.path,
		element: <COMPONENTS_PAGE.BUTTON_GROUP />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.components.subMenu.alert.path,
		element: <COMPONENTS_PAGE.ALERT />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.components.subMenu.badge.path,
		element: <COMPONENTS_PAGE.BADGE />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.components.subMenu.popovers.path,
		element: <COMPONENTS_PAGE.POPOVERS />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.components.subMenu.dropdowns.path,
		element: <COMPONENTS_PAGE.DROPDOWN />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.components.subMenu.accordion.path,
		element: <COMPONENTS_PAGE.ACCORDION />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.components.subMenu.modal.path,
		element: <COMPONENTS_PAGE.MODAL />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.components.subMenu.navsTabs.path,
		element: <COMPONENTS_PAGE.NAVS_TABS />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.components.subMenu.offcanvas.path,
		element: <COMPONENTS_PAGE.OFF_CANVAS />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.components.subMenu.table.path,
		element: <COMPONENTS_PAGE.TABLE />,
	},

	/**
	 * Utilities
	 */
	{
		path: 'null',
		// path: componentPagesMenu.utilities.path,
		element: <UTILITIES.UTILITIES />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.utilities.subMenu.api.path,
		element: <UTILITIES.API />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.utilities.subMenu.background.path,
		element: <UTILITIES.BACKGROUND />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.utilities.subMenu.borders.path,
		element: <UTILITIES.BORDERS />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.utilities.subMenu.colors.path,
		element: <UTILITIES.COLORS />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.utilities.subMenu.display.path,
		element: <UTILITIES.DISPLAY />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.utilities.subMenu.flex.path,
		element: <UTILITIES.FLEX />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.utilities.subMenu.float.path,
		element: <UTILITIES.FLOAT />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.utilities.subMenu.interactions.path,
		element: <UTILITIES.INTERACTIONS />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.utilities.subMenu.overflow.path,
		element: <UTILITIES.OVERFLOW />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.utilities.subMenu.position.path,
		element: <UTILITIES.POSITION />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.utilities.subMenu.shadows.path,
		element: <UTILITIES.SHADOWS />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.utilities.subMenu.sizing.path,
		element: <UTILITIES.SIZING />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.utilities.subMenu.spacing.path,
		element: <UTILITIES.SPACING />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.utilities.subMenu.text.path,
		element: <UTILITIES.TEXT />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.utilities.subMenu.verticalAlign.path,
		element: <UTILITIES.VERTICAL_ALIGN />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.utilities.subMenu.visibility.path,
		element: <UTILITIES.VISIBILITY />,
	},

	/**
	 * Extra
	 */

	/**
	 * Icons
	 */
	{
		path: 'null',
		// path: componentPagesMenu.icons.path,
		element: <ICONS.ICONS_LIST />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.icons.subMenu.icon.path,
		element: <ICONS.ICON />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.icons.subMenu.material.path,
		element: <ICONS.MATERIAL />,
	},

	/**
	 * Charts
	 */
	{
		path: 'null',
		// path: componentPagesMenu.charts.path,
		element: <CHARTS_PAGE.CHART_LIST />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.charts.subMenu.chartsUsage.path,
		element: <CHARTS_PAGE.GENERAL_USAGE />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.charts.subMenu.chartsSparkline.path,
		element: <CHARTS_PAGE.SPARKLINE />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.charts.subMenu.chartsLine.path,
		element: <CHARTS_PAGE.LINE />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.charts.subMenu.chartsArea.path,
		element: <CHARTS_PAGE.AREA />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.charts.subMenu.chartsColumn.path,
		element: <CHARTS_PAGE.COLUMN />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.charts.subMenu.chartsBar.path,
		element: <CHARTS_PAGE.BAR />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.charts.subMenu.chartsMixed.path,
		element: <CHARTS_PAGE.MIXED />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.charts.subMenu.chartsTimeline.path,
		element: <CHARTS_PAGE.TIMELINE />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.charts.subMenu.chartsCandleStick.path,
		element: <CHARTS_PAGE.CANDLESTICK />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.charts.subMenu.chartsBoxWhisker.path,
		element: <CHARTS_PAGE.BOX_WHISKER />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.charts.subMenu.chartsPieDonut.path,
		element: <CHARTS_PAGE.PIE_DONUT />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.charts.subMenu.chartsRadar.path,
		element: <CHARTS_PAGE.RADAR />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.charts.subMenu.chartsPolar.path,
		element: <CHARTS_PAGE.POLAR />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.charts.subMenu.chartsRadialBar.path,
		element: <CHARTS_PAGE.RADIAL_BAR />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.charts.subMenu.chartsBubble.path,
		element: <CHARTS_PAGE.BUBBLE />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.charts.subMenu.chartsScatter.path,
		element: <CHARTS_PAGE.SCATTER />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.charts.subMenu.chartsHeatMap.path,
		element: <CHARTS_PAGE.HEAT_MAP />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.charts.subMenu.chartsTreeMap.path,
		element: <CHARTS_PAGE.TREE_MAP />,
	},

	{
		path: 'null',
		// path: componentPagesMenu.notification.path,
		element: <EXTRA.NOTIFICATION />,
	},
	{
		path: 'null',
		// path: componentPagesMenu.hooks.path,
		element: <EXTRA.HOOKS />,
	},
];
const contents = [...presentation, ...documentation];

export default contents;
