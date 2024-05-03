import createBaseRepository from '~/repository/BaseRepository.js'

export default (ctx, inject) => {
  const baseRepository = createBaseRepository(ctx.$axios)
  inject('getEvent', baseRepository('/wp/v2/events'))
  inject('getUpcomingEvents', baseRepository('/caf/v1/upcoming-events'))
  inject('getHomePage', baseRepository('/wp/v2/pages/5'))
  inject('getSchedule', baseRepository('/wp/v2/pages/339'))
  inject('getScheduleByDate', baseRepository('/caf/v1/schedule'))
  inject('getAboutUs', baseRepository('/wp/v2/pages/365'))
  inject('getFooter', baseRepository('/wp/v2/global_elements/46'))
  inject('getFaq', baseRepository('/wp/v2/pages/358'))
  inject('getSupport', baseRepository('/wp/v2/pages/352'))
  inject('getContact', baseRepository('/wp/v2/pages/362'))
  inject('getFooter', baseRepository('/wp/v2/global_elements/46'))
}
