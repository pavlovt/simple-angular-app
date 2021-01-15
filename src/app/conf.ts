import { Injectable } from "@angular/core";

@Injectable()
export class Conf {
  title = 'Default Title - ';
  apis = {
    auth: '/auth'
  }
  route = '/home'

  user = { access_token: '' }
  userRoles = []

  roles = ['GlobalAdmin', 'LocalAdmin', 'SecurityOfficer', 'Receptionist', 'StandardUser']
  rights = {
    '/settings/profile': ['GlobalAdmin', 'LocalAdmin', 'Receptionist', 'SecurityOfficer', 'StandardUser'],
    '/dashboard': ['GlobalAdmin', 'LocalAdmin', 'Receptionist', 'SecurityOfficer', 'StandardUser'],
  }

  def = {
    minSearchChars: 2,
  }
  cache = {}
}
