/**
 * Module Directives as public properties
 *
 * this.title 				= "Title of the module";
 * this.author 			= "Author of the module";
 * this.webURL 			= "Web URL for docs purposes";
 * this.description 		= "Module description";
 * this.version 			= "Module Version";
 * this.viewParentLookup   = (true) [boolean] (Optional) // If true, checks for views in the parent first, then it the module.If false, then modules first, then parent.
 * this.layoutParentLookup = (true) [boolean] (Optional) // If true, checks for layouts in the parent first, then it the module.If false, then modules first, then parent.
 * this.entryPoint  		= "" (Optional) // If set, this is the default event (ex:forgebox:manager.index) or default route (/forgebox) the framework will use to create an entry link to the module. Similar to a default event.
 * this.cfmapping			= "The CF mapping to create";
 * this.modelNamespace		= "The namespace to use for registered models, if blank it uses the name of the module."
 * this.dependencies 		= "The array of dependencies for this module"
 *
 * structures to create for configuration
 * - parentSettings : struct (will append and override parent)
 * - settings : struct
 * - interceptorSettings : struct of the following keys ATM
 * 	- customInterceptionPoints : string list of custom interception points
 * - interceptors : array
 * - layoutSettings : struct (will allow to define a defaultLayout for the module)
 * - wirebox : The wirebox DSL to load and use
 *
 * Available objects in variable scope
 * - controller
 * - appMapping (application mapping)
 * - moduleMapping (include,cf path)
 * - modulePath (absolute path)
 * - log (A pre-configured logBox logger object for this object)
 * - binder (The wirebox configuration binder)
 * - wirebox (The wirebox injector)
 *
 * Required Methods
 * - configure() : The method ColdBox calls to configure the module.
 *
 * Optional Methods
 * - onLoad() 		: If found, it is fired once the module is fully loaded
 * - onUnload() 	: If found, it is fired once the module is unloaded
 **/
 component {

	// Module Properties
	this.title 				= "cbadmin-vue-argon";
	this.author 			= "";
	this.webURL 			= "";
	this.description 		= "";
	this.version			= "0.0.2";
	// If true, looks for views in the parent first, if not found, then in the module. Else vice-versa
	this.viewParentLookup 	= true;
	// If true, looks for layouts in the parent first, if not found, then in module. Else vice-versa
	this.layoutParentLookup = true;
	// Module Entry Point
	this.entryPoint			= "cbadmin-vue-argon";
	// Inherit Entry Point
	this.inheritEntryPoint 	= false;
	// Model Namespace
	this.modelNamespace		= "cbadmin-vue-argon";
	// CF Mapping
	this.cfmapping			= "cbadmin-vue-argon";
	// Auto-map models
	this.autoMapModels		= true;
	// Module Dependencies
	this.dependencies 		= ['cbadmin'];

	/**
	 * Configure the module
	 */
	function configure(){

		// parent settings
		parentSettings = {
		};

		// module settings - stored in modules.name.settings
		settings = {
		};

		// Layout Settings
		layoutSettings = {
			defaultLayout = ""
		};

		routes = [
			{ pattern="/", handler="vue", action ="index" },
			{ pattern="/login", handler="vue", action ="index" },
			{ pattern="/logout", handler="vue", action ="index" },
			{ pattern="/register", handler="vue", action ="index" },
			{ pattern="/reset", handler="vue", action ="index" },

			{ pattern="/user", handler="vue", action ="index" },
			{ pattern="/role", handler="vue", action ="index" },
			{ pattern="/permission", handler="vue", action ="index" },
			{ pattern="/permissiongroup", handler="vue", action ="index" },
		];

		// Custom Declared Points
		interceptorSettings = {
			customInterceptionPoints = []
		};

		// Custom Declared Interceptors
		interceptors = [
		];

		// Binder Mappings
		// binder.map("Alias").to("#moduleMapping#.models.MyService");

		addTopRoutes('vue');
	}

	/**
	 * Fired when the module is registered and activated.
	 */
	function onLoad(){
		buildMenu();
	}

	/**
	 * Fired when the module is unregistered and unloaded
	 */
	function onUnload(){

	}

	private function buildMenu()
	{
		var menuservice	= wirebox.getInstance("MenuService@cbadmin");
		var sidebar = menuService.addOrReturnRegion('sidebar');

		sidebar.addMenuItem( label = "Users", icon = "pi pi-fw pi-user", items = [
			menuService.getNewMenuItem().set( label = "Users", icon = "pi pi-fw pi-user", to ="/user/list"),
			menuService.getNewMenuItem().set( label = "Roles", icon = "pi pi-fw pi-user", to ="/role/list"),
			menuService.getNewMenuItem().set( label = "Permissions", icon = "pi pi-fw pi-user", to ="/permission/list"),
			menuService.getNewMenuItem().set( label = "Permission groups", icon = "pi pi-fw pi-user", to ="/permissiongroup/list")

		]);
	}

	private function addTopRoutes(string routeFilterList )
	{
		var routingService= controller.getRoutingService();
		var parentRoutes  = routingService.getRoutes();
		var restoreRoutes = [];

		// remove default routes out of routes table
		// add it later at end
		routingService.setRoutes(
			parentRoutes.filter( function( item ){
				arrayAppend(restoreRoutes, item );
				return ( item.pattern NEQ ":handler/" AND item.pattern NEQ ":handler/:action/" );
			} )
		);

		// add all vue and api routes at end of routing table
		variables.routes.each( function( item ){
			// Check if handler defined
			if( structKeyExists( item, "handler") 
				&& listFindNoCase(routeFilterList,item.handler) 
			){
				item.handler = "#this.entryPoint#:#item.handler#";
				// add it as main application route.
				routingService.addRoute( argumentCollection=item );
			}
		} );
		// restore prevoiusly saved routes
		restoreRoutes.each( function( item ){
			routingService.addRoute( argumentCollection=item );
		} );
	}
}