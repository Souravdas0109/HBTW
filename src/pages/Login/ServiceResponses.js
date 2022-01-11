export const ServiceResponses = {
  login: {
    serviceUnavailable: 'Login failed. Service is not available.',
    userNotExist: 'Login failed. Employee does not exist.',
  },
  app: {
    loading: 'Loading...',
    accessDenied: 'Access Denied',
    noPermMsg: 'You do not have the permission to access this page',
    serviceError:
      'An error occured while connecting to service. Please try again later',
    serviceUnavailable: 'Service not available',
    usernotadded: 'Login failed. User not added to Commercial Web Application.',
  },
  dashboard: {
    task: (
      <div>
        <div>
          <strong>My:</strong>
        </div>
        <div>
          <strong>Pending Actions:</strong> User can see the list of task(s)
          which is not yet started.
        </div>{' '}
        <div>
          <strong>In-progress Task:</strong> User can see the list of task(s)
          which is started but incomplete.
        </div>{' '}
        <div>
          <strong>Group:</strong>
        </div>{' '}
        <div>
          <strong>Pending Actions:</strong> User can see the list of task(s)
          which is pending by self and/or others from the same group.
        </div>{' '}
        <div>
          <strong>Unassigned Workflow:</strong> User can see the list of task(s)
          which is yet to be assigned.
        </div>
      </div>
    ),
  },
}
