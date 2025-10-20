// framework/OpenSiS.js
// ============================================================================
// OpenSiS FRAMEWORK CORE - Student Information System Framework
// Open Source Framework for Educational Technology
// https://github.com/BlacklinkLLC/OpenSiS
// ============================================================================

/**
 * SiSFramework - Core framework for building Student Information Systems
 * @class
 * @example
 * const sis = new SiSFramework();
 * sis.registerModule('grades', {
 *   label: 'Grades',
 *   icon: '📝',
 *   component: GradesComponent,
 *   type: 'standard'
 * });
 */
export class SiSFramework {
  static VERSION = '1.0.0';
  static VALID_TYPES = ['standard', 'analytics', 'admin', 'custom'];
  static VALID_EVENTS = ['onModuleRegister', 'onModuleUnregister', 'onDataChange'];

  constructor(options = {}) {
    this.modules = new Map();
    this.hooks = {
      onModuleRegister: [],
      onModuleUnregister: [],
      onDataChange: [],
    };
    this.options = {
      strictMode: options.strictMode !== false, // Enable strict validation by default
      debug: options.debug || false,
      ...options,
    };

    this._log('SiSFramework initialized', { version: SiSFramework.VERSION, options: this.options });
  }

  /**
   * Register a new module in the framework
   * @param {string} key - Unique identifier for the module
   * @param {Object} config - Module configuration
   * @param {string} config.label - Display name
   * @param {string} config.icon - Icon (emoji or identifier)
   * @param {React.Component} config.component - React component
   * @param {string} [config.type='standard'] - Module type
   * @param {string} [config.description=''] - Description
   * @param {Object} [config.metadata={}] - Additional metadata
   * @throws {Error} If validation fails in strict mode
   * @returns {boolean} Success status
   */
  registerModule(key, config) {
    try {
      // Validate key
      if (!key || typeof key !== 'string' || key.trim() === '') {
        throw new Error('Module key must be a non-empty string');
      }

      // Check for duplicate
      if (this.modules.has(key)) {
        const message = `Module "${key}" already exists`;
        if (this.options.strictMode) {
          throw new Error(message);
        }
        console.warn(message);
        return false;
      }

      // Validate config
      this._validateModuleConfig(config);

      // Normalize and create module
      const module = {
        key,
        label: config.label,
        icon: config.icon,
        component: config.component,
        description: config.description || '',
        type: config.type || 'standard',
        metadata: config.metadata || {},
        registeredAt: new Date().toISOString(),
      };

      this.modules.set(key, module);
      this._log(`Module registered: ${key}`, module);
      this.triggerHook('onModuleRegister', { key, module });

      return true;
    } catch (error) {
      if (this.options.strictMode) {
        throw error;
      }
      console.error(`Failed to register module "${key}":`, error);
      return false;
    }
  }

  /**
   * Unregister a module from the framework
   * @param {string} key - Module identifier
   * @returns {boolean} Success status
   */
  unregisterModule(key) {
    if (!this.modules.has(key)) {
      this._log(`Module not found: ${key}`, { level: 'warn' });
      return false;
    }

    const module = this.modules.get(key);
    if (this.modules.delete(key)) {
      this._log(`Module unregistered: ${key}`);
      this.triggerHook('onModuleUnregister', { key, module });
      return true;
    }
    return false;
  }

  /**
   * Get a specific module
   * @param {string} key - Module identifier
   * @returns {Object|undefined} Module configuration
   */
  getModule(key) {
    return this.modules.get(key);
  }

  /**
   * Check if a module exists
   * @param {string} key - Module identifier
   * @returns {boolean}
   */
  hasModule(key) {
    return this.modules.has(key);
  }

  /**
   * Get all registered modules
   * @returns {Array} Array of module configurations
   */
  getAllModules() {
    return Array.from(this.modules.values());
  }

  /**
   * Get modules filtered by type
   * @param {string} type - Module type to filter by
   * @returns {Array} Filtered array of modules
   */
  getModulesByType(type) {
    return Array.from(this.modules.values()).filter(m => m.type === type);
  }

  /**
   * Get total count of registered modules
   * @returns {number}
   */
  getModuleCount() {
    return this.modules.size;
  }

  /**
   * Register a hook callback
   * @param {string} eventName - Event name to listen to
   * @param {Function} callback - Callback function
   * @returns {Function} Unsubscribe function
   */
  hook(eventName, callback) {
    if (!SiSFramework.VALID_EVENTS.includes(eventName)) {
      const message = `Invalid event name: ${eventName}. Valid events: ${SiSFramework.VALID_EVENTS.join(', ')}`;
      if (this.options.strictMode) {
        throw new Error(message);
      }
      console.warn(message);
      return () => {};
    }

    if (typeof callback !== 'function') {
      throw new Error('Hook callback must be a function');
    }

    this.hooks[eventName].push(callback);
    this._log(`Hook registered: ${eventName}`);

    // Return unsubscribe function
    return () => {
      const index = this.hooks[eventName].indexOf(callback);
      if (index > -1) {
        this.hooks[eventName].splice(index, 1);
        this._log(`Hook unregistered: ${eventName}`);
      }
    };
  }

  /**
   * Trigger a hook event
   * @param {string} eventName - Event name
   * @param {*} data - Data to pass to callbacks
   */
  triggerHook(eventName, data) {
    if (this.hooks[eventName]) {
      this._log(`Triggering hook: ${eventName}`, data);
      this.hooks[eventName].forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in hook callback for ${eventName}:`, error);
        }
      });
    }
  }

  /**
   * Clear all modules
   * @returns {number} Number of modules cleared
   */
  clearModules() {
    const count = this.modules.size;
    this.modules.clear();
    this._log(`Cleared ${count} modules`);
    return count;
  }

  /**
   * Get framework metadata
   * @returns {Object} Framework information
   */
  getInfo() {
    return {
      version: SiSFramework.VERSION,
      moduleCount: this.modules.size,
      modules: Array.from(this.modules.keys()),
      options: this.options,
    };
  }

  /**
   * Validate module configuration
   * @private
   */
  _validateModuleConfig(config) {
    if (!config || typeof config !== 'object') {
      throw new Error('Module config must be an object');
    }

    // Required fields
    if (!config.label || typeof config.label !== 'string') {
      throw new Error('Module must have a valid label (string)');
    }

    if (!config.icon || typeof config.icon !== 'string') {
      throw new Error('Module must have a valid icon (string)');
    }

    if (!config.component) {
      throw new Error('Module must have a component');
    }

    // Validate type if provided
    if (config.type && !SiSFramework.VALID_TYPES.includes(config.type)) {
      const message = `Invalid module type: ${config.type}. Valid types: ${SiSFramework.VALID_TYPES.join(', ')}`;
      if (this.options.strictMode) {
        throw new Error(message);
      }
      console.warn(message);
    }
  }

  /**
   * Internal logging utility
   * @private
   */
  _log(message, data = null, level = 'info') {
    if (!this.options.debug) return;

    const prefix = `[OpenSiS ${SiSFramework.VERSION}]`;
    const methods = { info: 'log', warn: 'warn', error: 'error' };
    const method = methods[level] || 'log';

    if (data) {
      console[method](prefix, message, data);
    } else {
      console[method](prefix, message);
    }
  }
}

export default SiSFramework;
