import { InjectionToken } from "@angular/core";

export let conf = new InjectionToken("conf");

export const AppConf = {
    defaultTitle: 'BreezN - ',
    user: {},
    userInfo: {},
    userRoles: [],
    userLocations: [],
    server: "http://jsonplaceholder.typicode.com",
    api: {
        posts: '/posts',
        auth: '/oauth/token',
        logout: '/logout',
        users: '/users',
        roles: '/roles',
    },
    progress: false,
    globalRoles: ['VeristreamAdmin', 'GlobalAdmin'],
    roles: ['VeristreamAdmin', 'GlobalAdmin', 'LocalAdmin', 'SecurityOfficer', 'Receptionist', 'StandardUser'],
    roleNames: {
            'VeristreamAdmin': 'Veristream Admin',
            'GlobalAdmin': 'Global Admin',
            'LocalAdmin': 'Local Admin',
            'SecurityOfficer': 'Security Officer',
            'Receptionist': 'Receptionist',
            'StandardUser': 'Standard User'
    },
    timeZones: [
        {id: '1', text: '(UTC-05:00) Easter Time'},
        {id: '2', text: '(UTC-06:00) Northern Time'},
        {id: '3', text: '(UTC-07:00) Southern Time'},
        {id: '4', text: '(UTC-08:00) Wester Time'},
        {id: '5', text: '(UTC-09:00) Easter Time'},
        {id: '6', text: '(UTC-10:00) Easter Time'}
    ],
    languages: [
        {id: 'en', text: 'English'},
        {id: 'es', text: 'Spanish'},
    ],
    defaultRoute: '/dashboard',
    // access information - defines which roles have access to which urls
    access: {
        pages: {
            '/settings/profile':['VeristreamAdmin', 'GlobalAdmin', 'LocalAdmin', 'Receptionist', 'SecurityOfficer', 'StandardUser'],
            '/dashboard': ['VeristreamAdmin', 'GlobalAdmin', 'LocalAdmin', 'Receptionist', 'SecurityOfficer', 'StandardUser'],
            '/settings/users': ['VeristreamAdmin', 'GlobalAdmin', 'LocalAdmin'],
            '/settings/locations': ['VeristreamAdmin', 'GlobalAdmin', 'LocalAdmin'],
            '/settings/location': ['VeristreamAdmin', 'GlobalAdmin', 'LocalAdmin'],
            '/settings/kiosk': ['VeristreamAdmin', 'GlobalAdmin'],
            '/settings/kiosk/themes': ['VeristreamAdmin', 'GlobalAdmin'],
            '/settings/devices': ['VeristreamAdmin', 'GlobalAdmin', 'LocalAdmin'],
            '/settings/account': ['VeristreamAdmin', 'GlobalAdmin', 'LocalAdmin'],
            '/settings/integrations': ['VeristreamAdmin', 'GlobalAdmin'],
            '/reports': ['VeristreamAdmin', 'GlobalAdmin', 'LocalAdmin', 'Receptionist', 'SecurityOfficer'],
            '/settings/watchlist': ['VeristreamAdmin', 'GlobalAdmin', 'LocalAdmin', 'SecurityOfficer', 'Receptionist'],
        }
    },
    cache: {
        locationId: null,
        dashboardColumns: null,
        statusFilter: null,
        currentLocation: null,
    },
    def: {
        defaultRedirect: '/home'
    }
};
