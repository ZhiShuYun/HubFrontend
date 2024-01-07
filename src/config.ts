export default {
  /**
   * The global configuration.
   */
  global: {},

  /**
   * The left navigation configuration.
   */
  navigation: {
    /**
     * Show chat entry in left navigation.
     */
    chat: true,

    /**
     * Show midjourney entry in left navigation.
     */
    midjourney: true,

    /**
     * Show console entry in left navigation.
     */
    console: true,

    /**
     * Show help entry in left navigation.
     */
    help: true
  },

  /**
   * The features configuration.
   */
  features: {
    /**
     * The chat feature config.
     */
    chat: {},

    /**
     * The midjourney feature config.
     */
    midjourney: {}
  },

  /**
   * The distribution configuration.
   */
  distribution: {
    /**
     * The default inviter id to use when no inviter id (in url) is provided,
     */
    defaultInviterId: undefined,

    /**
     * Force the inviter id to be used, even if an inviter id is provided.
     * Note: if the forceInviterId is set, there will be no distribution page in console except for the forced inviter.
     */
    forceInviterId: undefined
  }
};
