// framework/OpenSiS.js
// ============================================================================
// OpenSiS FRAMEWORK CORE - Student Information System Framework
// Open Source Framework for Educational Technology
// https://github.com/BlacklinkLLC/openesis
// ============================================================================

export class SiSFramework {
    constructor() {
        this.modules = new Map();
        this.hooks = {
            onModuleRegister: [],
            onModuleUnregister: [],
            onDataChange: [],
        };
    }

    registerModule(key, config) {
        if (this.modules.has(key)) {
            console.warn(`Module "${key}" already exists.`);
            return;
        }
        this.modules.set(key, {
            key,
            label: config.label,
            icon: config.icon,
            component: config.component,
            description: config.description || '',
            type: config.type || 'standard',
            metadata: config.metadata || {},
        });
        this.triggerHook('onModuleRegister', key);
    }

    unregisterModule(key) {
        if (this.modules.delete(key)) {
            this.triggerHook('onModuleUnregister', key);
            return true;
        }
        return false;
    }

    getModule(key) {
        return this.modules.get(key);
    }

    getAllModules() {
        return Array.from(this.modules.values());
    }

    getModulesByType(type) {
        return Array.from(this.modules.values()).filter(m => m.type === type);
    }

    hook(eventName, callback) {
        if (this.hooks[eventName]) {
            this.hooks[eventName].push(callback);
        }
    }

    triggerHook(eventName, data) {
        if (this.hooks[eventName]) {
            this.hooks[eventName].forEach(callback => callback(data));
        }
    }
}

export default SiSFramework;