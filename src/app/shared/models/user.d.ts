export interface IRequestUser {
  user: { uid: string; email: string };
}

export interface IRoot {
  // used to query details by username
  // maintained and updated by a firebase function
  usernameMap: {
    [username: string]: string; // uid
  };

  users: {
    [uid: string]: IPerson;
  };
}

interface ILocality {
  // Country of Residence
  // 2 character country code
  // https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
  country: string;

  // Postal Address (full legal mailing address)
  // address formats are inconsistent throughout the world
  // so this input could be validated through google maps
  // or through a custom input component that forces international
  // formats based on a pre-designed ui form for the relevant region
  // ISO 2022 attempts to use 3.1.6 of https://www.iso20022.org/sites/default/files/documents/general/ISO20022_BAHV2_MDR_v1.pdf
  mailingAddress?: string;

  // geo position (latitude, longitude)
  // use google maps to set lat lon based on mailing address
  lat?: string;
  lon?: string;
}

export interface IPerson {
  uid: string;
  email: string;
  profile?: IPersonProfile;
}

interface IPersonProfile extends ILocality {
  // name
  first: string;
  nickname?: string;
  middle?: string;
  last: string;

  // primary phone
  phone: string;

  // cell phone
  mobile?: string;

  email: string;
}

export interface IUserMeta {
  // NOTE: decided not to flatten because this allows us to put
  // firebase rules on /profile and lock off other writable nodes
  // about a user inline with profile, like duplicating permissions
  profile: {
    // email: string; // use firebase.auth.currentUser instead of duplicating email
  };

  permissions: IPermissions;
}

// function triggers write to this database node in isolation
export interface IPermissionsNode {
  [uid: string]: IPermissions;
}

// defines permissions as super or on specific team
export interface IPermissions {
  // permissions for managing super administrator (ie: system admin)
  super?: IRoles;

  // permissions for managing teams
  teams: {
    [teamId: string]: IRoles;
  };
}

// programmatic role types
export interface IRoles {
  // structured with plural roles rather than a single role
  // so that we can scale out more permissions if needed
  roles: {
    admin?: boolean;
    manager?: boolean;
    read?: boolean;
  };
}
