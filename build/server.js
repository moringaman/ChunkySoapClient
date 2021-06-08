module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch (e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "25a65ca83dee10b0af0e";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_selfInvalidated: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 			invalidate: function() {
/******/ 				this._selfInvalidated = true;
/******/ 				switch (hotStatus) {
/******/ 					case "idle":
/******/ 						hotUpdate = {};
/******/ 						hotUpdate[moduleId] = modules[moduleId];
/******/ 						hotSetStatus("ready");
/******/ 						break;
/******/ 					case "ready":
/******/ 						hotApplyInvalidatedModule(moduleId);
/******/ 						break;
/******/ 					case "prepare":
/******/ 					case "check":
/******/ 					case "dispose":
/******/ 					case "apply":
/******/ 						(hotQueuedInvalidatedModules =
/******/ 							hotQueuedInvalidatedModules || []).push(moduleId);
/******/ 						break;
/******/ 					default:
/******/ 						// ignore requests in error states
/******/ 						break;
/******/ 				}
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash, hotQueuedInvalidatedModules;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 		return hotApplyInternal(options);
/******/ 	}
/******/
/******/ 	function hotApplyInternal(options) {
/******/ 		hotApplyInvalidatedModules();
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (
/******/ 					!module ||
/******/ 					(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 				)
/******/ 					continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire &&
/******/ 				// when called invalidate self-accepting is not possible
/******/ 				!installedModules[moduleId].hot._selfInvalidated
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					parents: installedModules[moduleId].parents.slice(),
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		if (hotUpdateNewHash !== undefined) {
/******/ 			hotCurrentHash = hotUpdateNewHash;
/******/ 			hotUpdateNewHash = undefined;
/******/ 		}
/******/ 		hotUpdate = undefined;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = item.parents;
/******/ 			hotCurrentChildModule = moduleId;
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			return hotApplyInternal(options).then(function(list) {
/******/ 				outdatedModules.forEach(function(moduleId) {
/******/ 					if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 				});
/******/ 				return list;
/******/ 			});
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModules() {
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			if (!hotUpdate) hotUpdate = {};
/******/ 			hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
/******/ 			hotQueuedInvalidatedModules = undefined;
/******/ 			return true;
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModule(moduleId) {
/******/ 		if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
/******/ 			hotUpdate[moduleId] = modules[moduleId];
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://localhost:3001/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./build/assets.json":
/*!***************************!*\
  !*** ./build/assets.json ***!
  \***************************/
/*! exports provided: client, , default */
/***/ (function(module) {

module.exports = JSON.parse("{\"client\":{\"js\":\"http://localhost:3001/static/js/bundle.js\"},\"\":{\"json\":[\"http://localhost:3001/../chunks.json\",\"http://localhost:3001/manifest.json\"],\"png\":[\"http://localhost:3001/icon_114x114.dd54050e25b8bb58d0e2433dc2995cad.png\",\"http://localhost:3001/icon_120x120.715eb318ff340e017ccca08c2db15cb8.png\",\"http://localhost:3001/icon_144x144.1643b60b2714dd369e453ca884897666.png\",\"http://localhost:3001/icon_152x152.ca9cd38e55fddd88570518e8c0299f23.png\",\"http://localhost:3001/icon_16x16.7c16fadb7ec472d485127634f14a015e.png\",\"http://localhost:3001/icon_180x180.8e34bc6d815173fe01ec33c77c5f660f.png\",\"http://localhost:3001/icon_192x192.1dec1dd565712cd97bd9fa828bcb356c.png\",\"http://localhost:3001/icon_32x32.ed670ba65ef48bbcfbd0d9792d944fb5.png\",\"http://localhost:3001/icon_36x36.597833536f5dbb41bee82cd6d5e738cc.png\",\"http://localhost:3001/icon_48x48.ee7db214ca94e210a7b9df96b9175c7a.png\",\"http://localhost:3001/icon_57x57.0d199f525995ac794fa2af8b5ff15366.png\",\"http://localhost:3001/icon_60x60.754cd5221c4be7447b6f4d2d4a5b5e18.png\",\"http://localhost:3001/icon_72x72.f2d5307ca029e33b222a21552a08a109.png\",\"http://localhost:3001/icon_76x76.22d7b8a972a188f00270debd7f411358.png\",\"http://localhost:3001/icon_96x96.d79ec2402bdb8483fb8fe9415dbf9d1e.png\"],\"js\":[\"http://localhost:3001/precache-manifest.9b25321742d7165a225122ff2491796b.js\",\"http://localhost:3001/static/js/0.chunk.js\",\"http://localhost:3001/static/js/1.chunk.js\",\"http://localhost:3001/static/js/2.chunk.js\",\"http://localhost:3001/sw.js\"]}}");

/***/ }),

/***/ "./node_modules/react-loader-spinner/dist/loader/css/react-spinner-loader.css":
/*!************************************************************************************!*\
  !*** ./node_modules/react-loader-spinner/dist/loader/css/react-spinner-loader.css ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Exports
module.exports = {};


/***/ }),

/***/ "./node_modules/webpack/hot/log-apply-result.js":
/*!*****************************************!*\
  !*** (webpack)/hot/log-apply-result.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function(updatedModules, renewedModules) {
	var unacceptedModules = updatedModules.filter(function(moduleId) {
		return renewedModules && renewedModules.indexOf(moduleId) < 0;
	});
	var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");

	if (unacceptedModules.length > 0) {
		log(
			"warning",
			"[HMR] The following modules couldn't be hot updated: (They would need a full reload!)"
		);
		unacceptedModules.forEach(function(moduleId) {
			log("warning", "[HMR]  - " + moduleId);
		});
	}

	if (!renewedModules || renewedModules.length === 0) {
		log("info", "[HMR] Nothing hot updated.");
	} else {
		log("info", "[HMR] Updated modules:");
		renewedModules.forEach(function(moduleId) {
			if (typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
				var parts = moduleId.split("!");
				log.groupCollapsed("info", "[HMR]  - " + parts.pop());
				log("info", "[HMR]  - " + moduleId);
				log.groupEnd("info");
			} else {
				log("info", "[HMR]  - " + moduleId);
			}
		});
		var numberIds = renewedModules.every(function(moduleId) {
			return typeof moduleId === "number";
		});
		if (numberIds)
			log(
				"info",
				"[HMR] Consider using the NamedModulesPlugin for module names."
			);
	}
};


/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/*!****************************!*\
  !*** (webpack)/hot/log.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

var logLevel = "info";

function dummy() {}

function shouldLog(level) {
	var shouldLog =
		(logLevel === "info" && level === "info") ||
		(["info", "warning"].indexOf(logLevel) >= 0 && level === "warning") ||
		(["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error");
	return shouldLog;
}

function logGroup(logFn) {
	return function(level, msg) {
		if (shouldLog(level)) {
			logFn(msg);
		}
	};
}

module.exports = function(level, msg) {
	if (shouldLog(level)) {
		if (level === "info") {
			console.log(msg);
		} else if (level === "warning") {
			console.warn(msg);
		} else if (level === "error") {
			console.error(msg);
		}
	}
};

/* eslint-disable node/no-unsupported-features/node-builtins */
var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;
/* eslint-enable node/no-unsupported-features/node-builtins */

module.exports.group = logGroup(group);

module.exports.groupCollapsed = logGroup(groupCollapsed);

module.exports.groupEnd = logGroup(groupEnd);

module.exports.setLogLevel = function(level) {
	logLevel = level;
};

module.exports.formatError = function(err) {
	var message = err.message;
	var stack = err.stack;
	if (!stack) {
		return message;
	} else if (stack.indexOf(message) < 0) {
		return message + "\n" + stack;
	} else {
		return stack;
	}
};


/***/ }),

/***/ "./node_modules/webpack/hot/poll.js?300":
/*!*********************************!*\
  !*** (webpack)/hot/poll.js?300 ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__resourceQuery) {/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/*globals __resourceQuery */
if (true) {
	var hotPollInterval = +__resourceQuery.substr(1) || 10 * 60 * 1000;
	var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");

	var checkForUpdate = function checkForUpdate(fromUpdate) {
		if (module.hot.status() === "idle") {
			module.hot
				.check(true)
				.then(function(updatedModules) {
					if (!updatedModules) {
						if (fromUpdate) log("info", "[HMR] Update applied.");
						return;
					}
					__webpack_require__(/*! ./log-apply-result */ "./node_modules/webpack/hot/log-apply-result.js")(updatedModules, updatedModules);
					checkForUpdate(true);
				})
				.catch(function(err) {
					var status = module.hot.status();
					if (["abort", "fail"].indexOf(status) >= 0) {
						log("warning", "[HMR] Cannot apply update.");
						log("warning", "[HMR] " + log.formatError(err));
						log("warning", "[HMR] You need to restart the application!");
					} else {
						log("warning", "[HMR] Update failed: " + log.formatError(err));
					}
				});
		}
	};
	setInterval(checkForUpdate, hotPollInterval);
} else {}

/* WEBPACK VAR INJECTION */}.call(this, "?300"))

/***/ }),

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux */ "redux");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _src_reducers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../src/reducers */ "./src/reducers/index.js");
/* harmony import */ var _containers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./containers */ "./src/containers/index.js");
/* harmony import */ var _src_components_Basket__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../src/components/Basket */ "./src/components/Basket.js");
/* harmony import */ var _components_PrivateRoute__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/PrivateRoute */ "./src/components/PrivateRoute.js");
/* harmony import */ var _stripe_stripe_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @stripe/stripe-js */ "@stripe/stripe-js");
/* harmony import */ var _stripe_stripe_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_stripe_stripe_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _stripe_react_stripe_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @stripe/react-stripe-js */ "@stripe/react-stripe-js");
/* harmony import */ var _stripe_react_stripe_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_stripe_react_stripe_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _src_components_layout__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../src/components/layout */ "./src/components/layout/index.js");
/* harmony import */ var _styles_global_css__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./styles/global.css */ "./src/styles/global.css");
/* harmony import */ var _styles_global_css__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_styles_global_css__WEBPACK_IMPORTED_MODULE_11__);
var _jsxFileName = "/home/webnostix/Codebase/ChunkySoap2021/client/src/App.js";












var store = Object(redux__WEBPACK_IMPORTED_MODULE_1__["createStore"])(_src_reducers__WEBPACK_IMPORTED_MODULE_4__["default"]); // const stripePromise = loadStripe('pk_test_3o7rovRbtC8Fmec24VShO7pU')

var stripePromise = Object(_stripe_stripe_js__WEBPACK_IMPORTED_MODULE_8__["loadStripe"])("pk_test_3o7rovRbtC8Fmec24VShO7pU"); // ADD PUBLISHABLE KEY
// sk_test_rvboOk0S3wSR1tPGYuzzcjpV

console.log("DEV: ", "http://localhost:1337");

var App = function App() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_2__["Provider"], {
    store: store,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 3
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_stripe_react_stripe_js__WEBPACK_IMPORTED_MODULE_9__["Elements"], {
    stripe: stripePromise,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Switch"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_src_components_layout__WEBPACK_IMPORTED_MODULE_10__["WithNavbar"], {
    color: "light",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], {
    exact: true,
    path: "/",
    component: _containers__WEBPACK_IMPORTED_MODULE_5__["HomePage"],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 13
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], {
    path: "/search-results",
    component: _containers__WEBPACK_IMPORTED_MODULE_5__["SearchResults"],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 13
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], {
    path: "/basket",
    component: _src_components_Basket__WEBPACK_IMPORTED_MODULE_6__["default"],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28,
      columnNumber: 13
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], {
    exact: true,
    path: "/checkout",
    component: _containers__WEBPACK_IMPORTED_MODULE_5__["CheckoutPage"],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 13
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], {
    path: "/product/:_id",
    exact: true,
    component: _containers__WEBPACK_IMPORTED_MODULE_5__["ProductPage"],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 13
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], {
    path: "/category/:_id",
    component: _containers__WEBPACK_IMPORTED_MODULE_5__["CategoriesPage"],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 13
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], {
    path: "/authenticate",
    component: _containers__WEBPACK_IMPORTED_MODULE_5__["AuthPage"],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 13
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_PrivateRoute__WEBPACK_IMPORTED_MODULE_7__["default"], {
    path: "/admin",
    store: true,
    component: _containers__WEBPACK_IMPORTED_MODULE_5__["AdminPage"],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 13
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_PrivateRoute__WEBPACK_IMPORTED_MODULE_7__["default"], {
    path: "/admin/invoices/:_id",
    component: _containers__WEBPACK_IMPORTED_MODULE_5__["InvoicePage"],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 13
    }
  })))));
};

/* harmony default export */ __webpack_exports__["default"] = (App);

/***/ }),

/***/ "./src/api/greeting.js":
/*!*****************************!*\
  !*** ./src/api/greeting.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/(function () {
  var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(req, res) {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            res.status(200).json({
              message: "welcome to the chunkysoap api",
              version: "1.0",
              author: 'rob@webnostix.co.uk'
            });

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})());

/***/ }),

/***/ "./src/api/index.js":
/*!**************************!*\
  !*** ./src/api/index.js ***!
  \**************************/
/*! exports provided: payment_intents, v1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _payment_intents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./payment_intents */ "./src/api/payment_intents.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "payment_intents", function() { return _payment_intents__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _greeting__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./greeting */ "./src/api/greeting.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "v1", function() { return _greeting__WEBPACK_IMPORTED_MODULE_1__["default"]; });




/***/ }),

/***/ "./src/api/payment_intents.js":
/*!************************************!*\
  !*** ./src/api/payment_intents.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var stripe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! stripe */ "stripe");
/* harmony import */ var stripe__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(stripe__WEBPACK_IMPORTED_MODULE_2__);



var stripe = new stripe__WEBPACK_IMPORTED_MODULE_2___default.a("sk_test_rvboOk0S3wSR1tPGYuzzcjpV");
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/(function () {
  var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(req, res) {
    var amount, paymentIntent;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            amount = req.query.amount;
            console.log(amount);
            _context.next = 5;
            return stripe.paymentIntents.create({
              amount: amount,
              currency: 'gbp'
            });

          case 5:
            paymentIntent = _context.sent;
            res.status(200).send(paymentIntent.client_secret);
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            res.status(500).json({
              statusCode: 500,
              message: _context.t0.message
            });

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 9]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})());

/***/ }),

/***/ "./src/components/Basket.js":
/*!**********************************!*\
  !*** ./src/components/Basket.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router */ "react-router");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _styles_typography__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../styles/typography */ "./src/styles/typography.js");
/* harmony import */ var _styles_layout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../styles/layout */ "./src/styles/layout.js");
/* harmony import */ var _styles_ui__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../styles/ui */ "./src/styles/ui/index.js");
/* harmony import */ var _components_ui_AnimatedButton__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/ui/AnimatedButton */ "./src/components/ui/AnimatedButton.js");
/* harmony import */ var _components_ui_AddToCartBtn__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/ui/AddToCartBtn */ "./src/components/ui/AddToCartBtn.js");
/* harmony import */ var react_feather__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-feather */ "react-feather");
/* harmony import */ var react_feather__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_feather__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _helpers_functions__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../helpers/functions */ "./src/helpers/functions.js");
/* harmony import */ var _styles_ui_basket__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../styles/ui/basket */ "./src/styles/ui/basket.js");
/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../components/layout */ "./src/components/layout/index.js");

var _jsxFileName = "/home/webnostix/Codebase/ChunkySoap2021/client/src/components/Basket.js";













var Basket = function Basket(props) {
  var _useSelector = Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["useSelector"])(function (state) {
    return state.basket;
  }),
      basket = _useSelector.basket;

  var history = Object(react_router__WEBPACK_IMPORTED_MODULE_2__["useHistory"])();

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(0),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState, 2),
      postage = _useState2[0],
      setPostage = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(0),
      _useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState3, 2),
      total = _useState4[0],
      setTotal = _useState4[1];

  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    // if (fn.getCartTotal(basket.products) < 25 && basket.postage < 4) {
    console.log("BASKET POSTAGE", basket.postage);
    setPostage(basket.postage || 0.00); // } else {
    //     setPostage(0)
    // }

    setTotal(_helpers_functions__WEBPACK_IMPORTED_MODULE_10__["getCartTotal"](basket.products, postage));
  }, [basket]);
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    setTotal(_helpers_functions__WEBPACK_IMPORTED_MODULE_10__["getCartTotal"](basket.products, postage));
  }, [postage]);
  console.log("BASKET PAGE ", basket);

  var goBack = function goBack() {
    history.goBack();
  };

  var navigate = function navigate(url) {
    history.push(url);
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_5__["Section"], {
    light: true,
    color: 'white',
    height: 1000,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_5__["Wrapper"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_4__["Heading1"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50,
      columnNumber: 17
    }
  }, "Your Basket"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_styles_ui_basket__WEBPACK_IMPORTED_MODULE_11__["BasketWrapper"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_styles_ui_basket__WEBPACK_IMPORTED_MODULE_11__["ProductRow"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_4__["Heading2"], {
    style: {
      flex: 3
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53,
      columnNumber: 21
    }
  }, "Product"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_4__["Heading2"], {
    style: {
      flex: 1
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54,
      columnNumber: 21
    }
  }, "Price"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_4__["Heading2"], {
    style: {
      flex: 1
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55,
      columnNumber: 21
    }
  }, "Quantity"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_4__["Heading2"], {
    style: {
      flex: 1
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56,
      columnNumber: 21
    }
  }, "Total")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_styles_ui_basket__WEBPACK_IMPORTED_MODULE_11__["Divider"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 58,
      columnNumber: 21
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_styles_ui_basket__WEBPACK_IMPORTED_MODULE_11__["ProductRow"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59,
      columnNumber: 17
    }
  }), basket.products.length > 0 ? basket.products.map(function (el) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_styles_ui_basket__WEBPACK_IMPORTED_MODULE_11__["ProductRow"], {
      key: el._id,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 63,
        columnNumber: 25
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_styles_ui__WEBPACK_IMPORTED_MODULE_6__["ProductFrame"], {
      sml: true,
      style: {
        flex: 1,
        marginRight: 70
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 64,
        columnNumber: 29
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", {
      src: "http://localhost:1337".concat(el.product_picture_1),
      style: {
        display: 'block',
        maxHeight: '70px',
        maxWidth: '70px',
        width: 'auto',
        height: 'auto'
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 65,
        columnNumber: 33
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      style: {
        flex: 2,
        paddingRight: 90
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 69,
        columnNumber: 29
      }
    }, el.product_name, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 70,
        columnNumber: 51
      }
    }), el.product_description), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      style: {
        flex: 1,
        margin: 5
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 73,
        columnNumber: 29
      }
    }, "\xA3", el.product_price), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      style: {
        flex: .5,
        marginRight: 75,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 76,
        columnNumber: 29
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_ui_AddToCartBtn__WEBPACK_IMPORTED_MODULE_8__["default"], {
      product: el,
      "function": "delete",
      icon: true,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 77,
        columnNumber: 33
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_feather__WEBPACK_IMPORTED_MODULE_9__["MinusCircle"], {
      color: "gray",
      size: 28,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 78,
        columnNumber: 37
      }
    })), el.product_qty, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_ui_AddToCartBtn__WEBPACK_IMPORTED_MODULE_8__["default"], {
      product: el,
      "function": "add",
      icon: true,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 82,
        columnNumber: 33
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_feather__WEBPACK_IMPORTED_MODULE_9__["PlusCircle"], {
      color: "lightgreen",
      size: 28,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 83,
        columnNumber: 37
      }
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      style: {
        flex: 1,
        marginRight: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 86,
        columnNumber: 29
      }
    }, "\xA3", el.total_price.toFixed(2)));
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_4__["Heading2"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 91,
      columnNumber: 26
    }
  }, "You Dont Have any Items in you basket yet"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_styles_ui_basket__WEBPACK_IMPORTED_MODULE_11__["ProductRow"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 92,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_styles_ui_basket__WEBPACK_IMPORTED_MODULE_11__["Divider"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 93,
      columnNumber: 25
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_styles_ui_basket__WEBPACK_IMPORTED_MODULE_11__["ProductRow"], {
    narrow: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 95,
      columnNumber: 21
    }
  }, "Postage: \xA3", postage.toFixed(2)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_styles_ui_basket__WEBPACK_IMPORTED_MODULE_11__["ProductRow"], {
    narrow: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 98,
      columnNumber: 21
    }
  }, "Sales Tax: \xA3 ", 0.00.toFixed(2)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_styles_ui_basket__WEBPACK_IMPORTED_MODULE_11__["ProductRow"], {
    narrow: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 101,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_4__["Heading2"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 102,
      columnNumber: 25
    }
  }, "Total: \xA3", total.toFixed(2))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_styles_ui_basket__WEBPACK_IMPORTED_MODULE_11__["ProductRow"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 106,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_ui_AnimatedButton__WEBPACK_IMPORTED_MODULE_7__["default"], {
    text: "Back",
    med: true,
    secondary: true,
    handleClick: function handleClick() {
      return goBack();
    } // style={{position: 'absolute', right: 130, transform: 'translateX(-50%)'}}
    ,
    style: {
      marginRight: '15px'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 107,
      columnNumber: 29
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_feather__WEBPACK_IMPORTED_MODULE_9__["ArrowLeft"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 112,
      columnNumber: 33
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_ui_AnimatedButton__WEBPACK_IMPORTED_MODULE_7__["default"], {
    text: "Secure Checkout",
    med: true,
    handleClick: function handleClick() {
      return navigate("/checkout");
    } // style={{position: 'absolute', right: 130, transform: 'translateX(-50%)'}}
    ,
    style: {
      marginRight: '9%'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 114,
      columnNumber: 29
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_feather__WEBPACK_IMPORTED_MODULE_9__["CreditCard"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 119,
      columnNumber: 33
    }
  })))))));
};

/* harmony default export */ __webpack_exports__["default"] = (Object(_components_layout__WEBPACK_IMPORTED_MODULE_12__["withHero"])({
  component: Basket
}));

/***/ }),

/***/ "./src/components/CategoryRow.js":
/*!***************************************!*\
  !*** ./src/components/CategoryRow.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _styles_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../styles/layout */ "./src/styles/layout.js");
/* harmony import */ var _styles_typography__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../styles/typography */ "./src/styles/typography.js");
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ui */ "./src/components/ui/index.js");
var _jsxFileName = "/home/webnostix/Codebase/ChunkySoap2021/client/src/components/CategoryRow.js";







var CategoryRow = function CategoryRow() {
  var _useSelector = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(function (state) {
    return state.categories || [];
  }),
      categories = _useSelector.categories;

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    console.log("CAT ROW: ", categories);
  }, [categories]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_3__["Section"], {
    height: 200,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_4__["SectionHeading"], {
    light: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19,
      columnNumber: 13
    }
  }, "Categories"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: "/drips.png",
    alt: "drips",
    style: {
      "float": 'right',
      width: '500px',
      transform: 'translate(50px, -70px)',
      zIndex: '5'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20,
      columnNumber: 17
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_3__["SlideGrid"], {
    mb: '-100px',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 13
    }
  }, categories && categories.map(function (el, i) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ui__WEBPACK_IMPORTED_MODULE_5__["Category"], {
      key: i,
      name: el.category_name,
      image: el.category_image.formats.thumbnail.url,
      id: el._id,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 28,
        columnNumber: 25
      }
    });
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (CategoryRow);

/***/ }),

/***/ "./src/components/CheckoutEditBilling.js":
/*!***********************************************!*\
  !*** ./src/components/CheckoutEditBilling.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "@babel/runtime/helpers/defineProperty");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _styles_layout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../styles/layout */ "./src/styles/layout.js");
/* harmony import */ var _styles_typography__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../styles/typography */ "./src/styles/typography.js");
/* harmony import */ var _components_ui__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/ui */ "./src/components/ui/index.js");
/* harmony import */ var _containers_forms_json__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../containers/forms.json */ "./src/containers/forms.json");
var _containers_forms_json__WEBPACK_IMPORTED_MODULE_9___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../containers/forms.json */ "./src/containers/forms.json", 1);
/* harmony import */ var react_feather__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-feather */ "react-feather");
/* harmony import */ var react_feather__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_feather__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _helpers___WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../helpers/ */ "./src/helpers/index.js");
/* harmony import */ var _helpers_functions__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../helpers/functions */ "./src/helpers/functions.js");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-router */ "react-router");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(react_router__WEBPACK_IMPORTED_MODULE_13__);




var _jsxFileName = "/home/webnostix/Codebase/ChunkySoap2021/client/src/components/CheckoutEditBilling.js";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }












var EditBilling = function EditBilling(_ref) {
  var user = _ref.user,
      cartState = _ref.cartState,
      cartDispatch = _ref.cartDispatch,
      buttonClick = _ref.buttonClick;
  var views = _containers_forms_json__WEBPACK_IMPORTED_MODULE_9__.views;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(false),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3___default()(_useState, 2),
      editing = _useState2[0],
      setEditing = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])({}),
      _useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3___default()(_useState3, 2),
      address = _useState4[0],
      setAddress = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(false),
      _useState6 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3___default()(_useState5, 2),
      loading = _useState6[0],
      setLoading = _useState6[1];

  var customer_title = user.customer_title,
      customer_firstname = user.customer_firstname,
      customer_lastname = user.customer_lastname,
      customer_address1 = user.customer_address1,
      customer_address2 = user.customer_address2,
      customer_town = user.customer_town,
      customer_postcode = user.customer_postcode;
  var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_5__["useDispatch"])();
  var history = Object(react_router__WEBPACK_IMPORTED_MODULE_13__["useHistory"])();
  console.log("USER_ID", user);

  var handleInputChange = function handleInputChange(e) {
    var _e$target = e.target,
        name = _e$target.name,
        value = _e$target.value;
    setAddress(function (values) {
      return _objectSpread(_objectSpread({}, values), {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()({}, name, value));
    });
  };

  var goBack = function goBack() {
    history.goBack();
  };

  Object(react__WEBPACK_IMPORTED_MODULE_4__["useEffect"])(function () {
    console.log("USER DETAILS", user.customer_firstname);

    if (user._id == '' && user.customer_firstname == '') {
      setEditing(true);
    } // populate address state with address 


    setAddress(user);
  }, [, user]);

  var submitForm = /*#__PURE__*/function () {
    var _ref2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(e) {
      var res;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setLoading(true);
              e.preventDefault();

              if (!cartState.authenticated) {
                _context.next = 11;
                break;
              }

              console.log("SUBMITTING FORM");
              _context.next = 6;
              return _helpers___WEBPACK_IMPORTED_MODULE_11__["myApi"].send("/customers/".concat(user._id), 'PUT', address);

            case 6:
              res = _context.sent;
              console.log("NEW ADDRESS ", res);
              dispatch({
                type: 'SET_USER_SESSION',
                payload: res
              });
              _context.next = 13;
              break;

            case 11:
              dispatch({
                type: 'SET_USER_SESSION',
                payload: address
              });
              console.log('ADDRESS ', address);

            case 13:
              setEditing(false);
              setLoading(false);

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function submitForm(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  var renderAddress = function renderAddress() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_6__["Frame"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 59,
        columnNumber: 25
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_6__["FrameHeader"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 60,
        columnNumber: 29
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_7__["SubHeading1"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 61,
        columnNumber: 33
      }
    }, "Billing Address"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_6__["Divider"], {
      mb: "10px",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 64,
        columnNumber: 33
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_6__["FrameBody"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 66,
        columnNumber: 29
      }
    }, user.customer_firstname ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_4___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_7__["Heading2"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 69,
        columnNumber: 33
      }
    }, customer_title, " ", customer_firstname, " ", customer_lastname), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_7__["Heading2"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 72,
        columnNumber: 33
      }
    }, customer_address1), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_7__["Heading2"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 75,
        columnNumber: 33
      }
    }, customer_address2), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_7__["Heading2"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 78,
        columnNumber: 33
      }
    }, customer_town), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_7__["Heading2"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 81,
        columnNumber: 33
      }
    }, customer_postcode)) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_7__["Heading2"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 85,
        columnNumber: 35
      }
    }, "Please provide a billing address")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_6__["FrameFooter"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 88,
        columnNumber: 25
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_6__["ButtonRow"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 89,
        columnNumber: 25
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_components_ui__WEBPACK_IMPORTED_MODULE_8__["AnimatedButton"], {
      big: true,
      secondary: true,
      text: "Back",
      handleClick: function handleClick() {
        return goBack();
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 90,
        columnNumber: 29
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_feather__WEBPACK_IMPORTED_MODULE_10__["ArrowLeft"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 90,
        columnNumber: 100
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_components_ui__WEBPACK_IMPORTED_MODULE_8__["AnimatedButton"], {
      big: true,
      secondary: true,
      text: "change",
      handleClick: function handleClick() {
        return setEditing(true);
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 91,
        columnNumber: 29
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_feather__WEBPACK_IMPORTED_MODULE_10__["Edit3"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 91,
        columnNumber: 110
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_components_ui__WEBPACK_IMPORTED_MODULE_8__["AnimatedButton"], {
      big: true,
      text: "confirm",
      handleClick: function handleClick() {
        return buttonClick('NEXT_STEP');
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 92,
        columnNumber: 29
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_feather__WEBPACK_IMPORTED_MODULE_10__["ArrowRight"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 92,
        columnNumber: 109
      }
    })))));
  };

  var renderForm = function renderForm() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_6__["Frame"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 101,
        columnNumber: 13
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_6__["FrameHeader"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 102,
        columnNumber: 17
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_7__["SubHeading1"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 103,
        columnNumber: 21
      }
    }, "Please provide a billing address"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_6__["Divider"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 104,
        columnNumber: 17
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_6__["FrameBody"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 106,
        columnNumber: 21
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("form", {
      onSubmit: function onSubmit(e) {
        return submitForm(e);
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 107,
        columnNumber: 25
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 108,
        columnNumber: 29
      }
    }, views.addressForm.map(function (el, i) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_components_ui__WEBPACK_IMPORTED_MODULE_8__["SimpleTextInput"], {
        placeholder: el.placeholder,
        label: el.label,
        name: el.name,
        key: i,
        handleChange: function handleChange(e) {
          return handleInputChange(e);
        },
        required: true,
        cols: el.width,
        value: address[el.value],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 111,
          columnNumber: 37
        }
      });
    }), !cartState.authenticated && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_components_ui__WEBPACK_IMPORTED_MODULE_8__["SimpleTextInput"], {
      placeholder: "example@gmail.com",
      label: "Email Address",
      name: "email",
      handleChange: function handleChange(e) {
        return handleInputChange(e);
      },
      required: true,
      cols: "100%",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 125,
        columnNumber: 33
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_6__["ButtonRow"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 135,
        columnNumber: 25
      }
    }, cartState.guest ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_components_ui__WEBPACK_IMPORTED_MODULE_8__["AnimatedButton"], {
      big: true,
      secondary: true,
      text: "Back",
      handleClick: function handleClick() {
        return cartDispatch({
          type: 'STANDARD_CHECKOUT'
        });
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 137,
        columnNumber: 30
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_feather__WEBPACK_IMPORTED_MODULE_10__["Edit3"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 137,
        columnNumber: 134
      }
    })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_components_ui__WEBPACK_IMPORTED_MODULE_8__["AnimatedButton"], {
      big: true,
      secondary: true,
      text: "Cancel",
      handleClick: function handleClick() {
        return setEditing(false);
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 138,
        columnNumber: 31
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_feather__WEBPACK_IMPORTED_MODULE_10__["Edit3"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 138,
        columnNumber: 113
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_components_ui__WEBPACK_IMPORTED_MODULE_8__["AnimatedButton"], {
      big: true,
      text: "Save",
      type: "submit",
      loading: loading ? 1 : undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 140,
        columnNumber: 29
      }
    })))));
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_4___default.a.Fragment, null, editing === false && user.customer_firstname && renderAddress(), (editing === true || !user.customer_firstname) && renderForm());
};

/* harmony default export */ __webpack_exports__["default"] = (EditBilling);

/***/ }),

/***/ "./src/components/CheckoutSteps.js":
/*!*****************************************!*\
  !*** ./src/components/CheckoutSteps.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_ui__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/ui */ "./src/components/ui/index.js");
/* harmony import */ var _styles_typography__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../styles/typography */ "./src/styles/typography.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ */ "./src/components/index.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _helpers___WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../helpers/ */ "./src/helpers/index.js");
/* harmony import */ var _styles_layout__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../styles/layout */ "./src/styles/layout.js");
/* harmony import */ var _helpers_functions__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../helpers/functions */ "./src/helpers/functions.js");




var _jsxFileName = "/home/webnostix/Codebase/ChunkySoap2021/client/src/components/CheckoutSteps.js";

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  ", "\n   min-width: 750px;\n   margin-top: 10px;\n   margin-right: auto;\n   margin-left: auto;\n   text-align: center;\n   transform: translateX(80px);\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}










var steps = [{
  no: 1,
  label: 'Account'
}, {
  no: 2,
  label: 'Shipping'
}, {
  no: 3,
  label: 'Payment'
}, {
  no: 4,
  label: 'Success'
}];

var CheckoutSteps = function CheckoutSteps() {
  var initialState = {
    step: 1,
    authenticated: false,
    guest: null,
    loading: false,
    errorMsg: '',
    postage: {},
    fields: {
      register: false,
      identifier: '',
      password: '',
      password_confirmation: '',
      username: ''
    }
  };

  var _useSelector = Object(react_redux__WEBPACK_IMPORTED_MODULE_5__["useSelector"])(function (state) {
    return state.user;
  }),
      user = _useSelector.user;

  var _useReducer = Object(react__WEBPACK_IMPORTED_MODULE_4__["useReducer"])(___WEBPACK_IMPORTED_MODULE_8__["checkoutReducer"], initialState),
      _useReducer2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3___default()(_useReducer, 2),
      cartState = _useReducer2[0],
      cartDispatch = _useReducer2[1];

  var step = cartState.step,
      authenticated = cartState.authenticated,
      guest = cartState.guest,
      postage = cartState.postage,
      loading = cartState.loading,
      _cartState$fields = cartState.fields,
      email = _cartState$fields.email,
      password = _cartState$fields.password,
      register = _cartState$fields.register,
      username = _cartState$fields.username,
      password_confirmation = _cartState$fields.password_confirmation;
  var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_5__["useDispatch"])();
  Object(react__WEBPACK_IMPORTED_MODULE_4__["useEffect"])(function () {
    var userInfo = _helpers___WEBPACK_IMPORTED_MODULE_10__["auth"].getUserInfo();

    if (!_helpers_functions__WEBPACK_IMPORTED_MODULE_12__["isEmpty"](userInfo)) {
      cartDispatch({
        type: 'LOGGED_IN'
      });
      var query = "?_where[user._id]=".concat(userInfo._id);
      apiCall(query);
    }

    console.log("USER SESSION ", userInfo);
  }, [, authenticated]);
  Object(react__WEBPACK_IMPORTED_MODULE_4__["useEffect"])(function () {
    console.log("CART DATA IS ", cartState, user);
  }, [cartState]);

  var apiCall = /*#__PURE__*/function () {
    var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee(query) {
      var res;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _helpers___WEBPACK_IMPORTED_MODULE_10__["myApi"].send("/customers".concat(query));

            case 3:
              res = _context.sent;
              console.log("CUSTOMER INFO ", res[0]);
              dispatch({
                type: "SET_USER_SESSION",
                payload: res[0]
              });
              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 8]]);
    }));

    return function apiCall(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var handleChange = function handleChange(e) {
    var _e$target = e.target,
        name = _e$target.name,
        value = _e$target.value,
        type = _e$target.type,
        checked = _e$target.checked;

    if (type === 'checkbox') {
      cartDispatch({
        type: 'CLEAR_FIELDS'
      });
      cartDispatch({
        type: 'UPDATE_FIELD',
        fieldName: name,
        fieldValue: checked
      });
      return;
    }

    cartDispatch({
      type: 'UPDATE_FIELD',
      fieldName: name,
      fieldValue: value
    });
  };

  var handleStrapiLogin = /*#__PURE__*/function () {
    var _ref2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee2(e) {
      var body, _body, response;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              e.preventDefault();
              cartDispatch({
                type: 'LOGGING_IN'
              });

              if (!(register === true)) {
                _context2.next = 20;
                break;
              }

              if (!(password !== password_confirmation)) {
                _context2.next = 6;
                break;
              }

              console.log("PASSWORDS MUST MATCH ");
              return _context2.abrupt("return");

            case 6:
              console.log("REGISTERING NEW USER");
              body = {
                email: email,
                password: password,
                username: username
              };
              _context2.prev = 8;
              _context2.next = 11;
              return _helpers___WEBPACK_IMPORTED_MODULE_10__["strapi"].register(body, dispatch);

            case 11:
              cartDispatch({
                type: 'LOGGED_IN'
              });
              _context2.next = 18;
              break;

            case 14:
              _context2.prev = 14;
              _context2.t0 = _context2["catch"](8);
              console.log(_context2.t0);
              cartDispatch({
                type: 'LOGIN_FAIL',
                payload: _context2.t0
              });

            case 18:
              _context2.next = 34;
              break;

            case 20:
              console.log("LOGGING IN USER with ", email, password);
              _body = {
                identifier: email,
                password: password,
                username: username
              };
              _context2.prev = 22;
              _context2.next = 25;
              return _helpers___WEBPACK_IMPORTED_MODULE_10__["strapi"].login(_body, dispatch);

            case 25:
              response = _context2.sent;

              if (response.status === 400) {
                cartDispatch({
                  type: 'LOGIN_FAIL',
                  payload: response.message
                });
              } else {
                cartDispatch({
                  type: 'LOGGED_IN'
                });
              }

              console.log('LOGIN RESPONSE ', response);
              _context2.next = 34;
              break;

            case 30:
              _context2.prev = 30;
              _context2.t1 = _context2["catch"](22);
              console.log('LOGIN ERROR ', _context2.t1);
              cartDispatch({
                type: 'LOGIN_FAIL',
                payload: _context2.t1
              });

            case 34:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[8, 14], [22, 30]]);
    }));

    return function handleStrapiLogin(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  var buttonClick = function buttonClick(action) {
    cartDispatch({
      type: action
    });
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_4___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(Steps, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 121,
      columnNumber: 17
    }
  }, steps.map(function (el) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_components_ui__WEBPACK_IMPORTED_MODULE_6__["WxStep"], {
      label: el.label,
      step: step,
      number: el.no,
      key: el.no,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 124,
        columnNumber: 25
      }
    });
  })), step === 1 && !authenticated && guest === null && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_4___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(___WEBPACK_IMPORTED_MODULE_8__["LoginForm"], {
    handleChange: handleChange,
    handleLogin: handleStrapiLogin,
    dispatch: cartDispatch,
    data: cartState.fields,
    loading: cartState.loading ? 1 : undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 130,
      columnNumber: 25
    }
  })), (step === 1 && authenticated || step === 1 && guest === true) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_4___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(___WEBPACK_IMPORTED_MODULE_8__["EditBilling"], {
    user: user,
    cartState: cartState,
    buttonClick: buttonClick,
    cartDispatch: cartDispatch,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 142,
      columnNumber: 25
    }
  })), step === 2 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_11__["Frame"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 148,
      columnNumber: 25
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_11__["FrameHeader"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 149,
      columnNumber: 29
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_7__["SubHeading1"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 150,
      columnNumber: 33
    }
  }, "Choose a Shipping Option")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_11__["FrameBody"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 154,
      columnNumber: 29
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(___WEBPACK_IMPORTED_MODULE_8__["ShippingOptions"], {
    dispatch: dispatch,
    cartDispatch: cartDispatch,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 155,
      columnNumber: 33
    }
  }))), step === 3 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_4___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(___WEBPACK_IMPORTED_MODULE_8__["StripePay"], {
    cartDispatch: cartDispatch,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 163,
      columnNumber: 25
    }
  })), step === 4 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_4___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(___WEBPACK_IMPORTED_MODULE_8__["CheckoutSuccess"], {
    cartState: cartState,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 170,
      columnNumber: 29
    }
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (CheckoutSteps);
var Steps = styled_components__WEBPACK_IMPORTED_MODULE_9___default.a.div(_templateObject(), ''
/* position: absolute; */
);

/***/ }),

/***/ "./src/components/CheckoutSuccess.js":
/*!*******************************************!*\
  !*** ./src/components/CheckoutSuccess.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui */ "./src/components/ui/index.js");
/* harmony import */ var _styles_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/layout */ "./src/styles/layout.js");
/* harmony import */ var _styles_typography__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../styles/typography */ "./src/styles/typography.js");
var _jsxFileName = "/home/webnostix/Codebase/ChunkySoap2021/client/src/components/CheckoutSuccess.js";





var CheckoutSuccess = function CheckoutSuccess(_ref) {
  var cartState = _ref.cartState;
  //TODO:
  // Delete cart State
  // remove cart data from local storage
  // Send confirmation email with cart details
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_2__["Frame"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_2__["FrameHeader"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_3__["SubHeading1"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16,
      columnNumber: 16
    }
  }, "Congratulations!!"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_2__["Divider"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19,
      columnNumber: 21
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_2__["FrameBody"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_3__["Paragraph"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 17
    }
  }, "Thankyou for shopping with the Chunky Soap Company"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_3__["Paragraph"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 17
    }
  }, "Your order has been successfully processed & a confirmation email has been sent to your registered email address")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_2__["FrameFooter"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_2__["ButtonRow"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 17
    }
  }, cartState.authenticated && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__["AnimatedButton"], {
    big: true,
    secondary: true,
    text: "My Account",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 25
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__["AnimatedButton"], {
    big: true,
    text: "Logout",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36,
      columnNumber: 21
    }
  }))));
};

/* harmony default export */ __webpack_exports__["default"] = (CheckoutSuccess);

/***/ }),

/***/ "./src/components/Footer.js":
/*!**********************************!*\
  !*** ./src/components/Footer.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/layout */ "./src/styles/layout.js");
var _jsxFileName = "/home/webnostix/Codebase/ChunkySoap2021/client/src/components/Footer.js";



var Footer = function Footer() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_1__["Section"], {
    height: 600,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: "/drips.png",
    alt: "drips",
    style: {
      "float": 'right',
      width: '500px',
      transform: 'translate(50px, -50px)'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8,
      columnNumber: 13
    }
  }), "Footer"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_1__["Section"], {
    light: true,
    height: 10,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11,
      columnNumber: 9
    }
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Footer);

/***/ }),

/***/ "./src/components/Hero.js":
/*!********************************!*\
  !*** ./src/components/Hero.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "@babel/runtime/helpers/extends");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router */ "react-router");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _styles_typography__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../styles/typography */ "./src/styles/typography.js");
/* harmony import */ var _styles_layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../styles/layout */ "./src/styles/layout.js");
/* harmony import */ var _styles_variables__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../styles/variables */ "./src/styles/variables.js");
/* harmony import */ var _styles_ui__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../styles/ui */ "./src/styles/ui/index.js");

var _jsxFileName = "/home/webnostix/Codebase/ChunkySoap2021/client/src/components/Hero.js";







var Hero = function Hero(props) {
  var history = Object(react_router__WEBPACK_IMPORTED_MODULE_2__["useHistory"])();
  var pathname = history.location.pathname;
  console.log("Location", pathname);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_4__["Section"], {
    dark: true,
    height: 180,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15,
      columnNumber: 9
    }
  }, _styles_variables__WEBPACK_IMPORTED_MODULE_5__["headerBubbles"].map(function (b, i) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_styles_ui__WEBPACK_IMPORTED_MODULE_6__["Bubble"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, b, {
      key: i,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 17,
        columnNumber: 13
      }
    }));
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", {
    src: "/drips.png",
    alt: "drips",
    style: {
      "float": 'right',
      width: '500px',
      transform: 'translate(50px, -70px)',
      zIndex: '5'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19,
      columnNumber: 17
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_4__["Container"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_3__["BannerHeading"], {
    style: {
      maxWidth: 550,
      transform: 'translateY(-50px)'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 17
    }
  }, "We offer FREE delivery on all orders over \xA325")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", {
    src: "/oversholder.webp",
    alt: "girl-pic",
    style: {
      position: 'absolute',
      top: 50,
      left: 560,
      maxHeight: 320
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 13
    }
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Hero);

/***/ }),

/***/ "./src/components/LoginForm.js":
/*!*************************************!*\
  !*** ./src/components/LoginForm.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/ui */ "./src/components/ui/index.js");
/* harmony import */ var _styles_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../styles/layout */ "./src/styles/layout.js");
/* harmony import */ var _styles_typography__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../styles/typography */ "./src/styles/typography.js");
/* harmony import */ var _containers_forms_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../containers/forms.json */ "./src/containers/forms.json");
var _containers_forms_json__WEBPACK_IMPORTED_MODULE_5___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../containers/forms.json */ "./src/containers/forms.json", 1);
/* harmony import */ var react_feather__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-feather */ "react-feather");
/* harmony import */ var react_feather__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_feather__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../hooks */ "./src/hooks/index.js");

var _jsxFileName = "/home/webnostix/Codebase/ChunkySoap2021/client/src/components/LoginForm.js";








var LoginForm = function LoginForm(props) {
  // set refs array for form input refs
  var myRefs = Object(react__WEBPACK_IMPORTED_MODULE_1__["useRef"])([]);
  var views = _containers_forms_json__WEBPACK_IMPORTED_MODULE_5__.views;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState, 2),
      currentView = _useState2[0],
      setCurrentView = _useState2[1];

  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    var current = props.data.register ? 'register' : 'login';
    setCurrentView(current); // myRefs.current[0].focus()

    console.log("MYREFS", myRefs);
  }, [, props.data.register, myRefs]);

  var addToRef = function addToRef(e) {
    console.log("ADDING REF", e);
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_3__["Frame"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_4__["Heading2"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 17
    }
  }, "Sign in to Continue"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("form", {
    onSubmit: function onSubmit(e) {
      return props.handleLogin(e);
    },
    style: {
      marginTop: 30,
      display: 'flex',
      width: '100%',
      flexDirection: 'column'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 17
    }
  }, currentView && views[currentView].map(function (el, i) {
    return (
      /*#__PURE__*/
      //TODO: Add value and make controlled
      react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_ui__WEBPACK_IMPORTED_MODULE_2__["SimpleTextInput"], {
        placeholder: el.placeholder,
        label: el.label,
        type: el.type,
        name: el.name,
        handleChange: props.handleChange,
        key: i,
        direction: el.direction,
        required: el.required,
        ref: function ref(e) {
          return myRefs.current[i] = e;
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 39,
          columnNumber: 29
        }
      })
    );
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52,
      columnNumber: 25
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53,
      columnNumber: 25
    }
  }, "I Don't have an account create one ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
    type: "checkbox",
    name: "register",
    checked: props.data.register,
    onChange: props.handleChange,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54,
      columnNumber: 64
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_3__["ButtonRow"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56,
      columnNumber: 25
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_ui__WEBPACK_IMPORTED_MODULE_2__["AnimatedButton"], {
    primary: true,
    fixed: true,
    type: "submit",
    text: props.data.register ? "Register" : "Sign In",
    med: true,
    loading: props.loading ? true : undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 29
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_feather__WEBPACK_IMPORTED_MODULE_6__["User"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 172
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 197
    }
  }), props.type !== 'standalone' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_ui__WEBPACK_IMPORTED_MODULE_2__["AnimatedButton"], {
    fixed: true,
    type: "button",
    text: "Guest Checkout",
    loading: "false",
    secondary: true,
    med: true,
    handleClick: function handleClick() {
      return props.dispatch({
        type: 'GUEST_CHECKOUT'
      });
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59,
      columnNumber: 29
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_feather__WEBPACK_IMPORTED_MODULE_6__["ArrowRight"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59,
      columnNumber: 178
    }
  })))));
};

/* harmony default export */ __webpack_exports__["default"] = (LoginForm);

/***/ }),

/***/ "./src/components/Modal.js":
/*!*********************************!*\
  !*** ./src/components/Modal.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "@babel/runtime/helpers/objectWithoutProperties");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _styles_components_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../styles/components/button */ "./src/styles/components/button.js");
/* harmony import */ var _components_ui_AnimatedButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/ui/AnimatedButton */ "./src/components/ui/AnimatedButton.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_feather__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-feather */ "react-feather");
/* harmony import */ var react_feather__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_feather__WEBPACK_IMPORTED_MODULE_7__);


var _jsxFileName = "/home/webnostix/Codebase/ChunkySoap2021/client/src/components/Modal.js";

function _templateObject5() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n    :after, :before { \n    width: 15px;\n    height: 3px;\n    background-color: white; \n    position: relative;\n    left: 8px;\n    top: 13px;\n   }\n  &::after{\n    content: '';\n    transform: rotate(-45deg);\n    position: absolute;\n  }\n  &::before {\n    content: '';\n    transform: rotate(45deg);\n    position: absolute;\n  }\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  width: 30px;\n  height: 30px;\n  padding: 5px;\n  background-color: gray;\n  color: white;\n  position: absolute;\n  border-radius: 50%;\n  right: 20px;\n  top: 20px;\n  border: none;\n  z-index: 1000;\n  cursor: pointer;\n  transition: all 0.3s ease-in;\n  &:hover {\n    background-color: black;\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  z-index: 100;\n  background: white;\n  position: relative;\n  margin: 50vh auto;\n  border-radius: 3px;\n  max-width: 1000px;\n  min-height: 400px;\n  padding: 3.0rem;\n  border-radius: 25px;\n  transform: translateY(-50%);\n  overflow: hidden;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n     position: fixed;\n        top: 0;\n    left: 0;\n    z-index: 1050;\n    width: 100%;\n    height: 100%;\n    overflow-x: hidden;\n    overflow-y: auto;\n    outline: 0;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n    position: fixed;\n    top: 0;\n    left: 0;\n    z-index: 1040;\n    width: 100vw;\n    height: 100vh;\n    background-color: #000;\n    opacity: 0.5;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}








var Modal = function Modal(_ref) {
  var isShowing = _ref.isShowing,
      hide = _ref.hide,
      rest = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default()(_ref, ["isShowing", "hide"]);

  return isShowing ? /*#__PURE__*/react_dom__WEBPACK_IMPORTED_MODULE_3___default.a.createPortal( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(ModalOverlay, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11,
      columnNumber: 11
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(ModalWrapper, {
    className: "modal-wrapper",
    "aria-modal": true,
    "aria-hidden": true,
    tabIndex: -1,
    role: "dialog" // onClick={hide}
    ,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(ModalMain, {
    className: "modal",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(CloseButton, {
    onClick: hide,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Cross, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 14
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "modal-header",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 15
    }
  }), rest.children))), document.body) : null;
};

/* harmony default export */ __webpack_exports__["default"] = (Modal);
var ModalOverlay = styled_components__WEBPACK_IMPORTED_MODULE_6___default.a.div(_templateObject());
var ModalWrapper = styled_components__WEBPACK_IMPORTED_MODULE_6___default.a.div(_templateObject2());
var ModalMain = styled_components__WEBPACK_IMPORTED_MODULE_6___default.a.div(_templateObject3());
var CloseButton = styled_components__WEBPACK_IMPORTED_MODULE_6___default.a.button(_templateObject4());
var Cross = styled_components__WEBPACK_IMPORTED_MODULE_6___default.a.div(_templateObject5());

/***/ }),

/***/ "./src/components/Navbar.js":
/*!**********************************!*\
  !*** ./src/components/Navbar.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router */ "react-router");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_router__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../helpers */ "./src/helpers/index.js");
/* harmony import */ var _styles_components_topnav__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../styles/components/topnav */ "./src/styles/components/topnav.js");
/* harmony import */ var _styles_variables__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../styles/variables */ "./src/styles/variables.js");
/* harmony import */ var _helpers_functions__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../helpers/functions */ "./src/helpers/functions.js");
/* harmony import */ var _ui_PageLink__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./ui/PageLink */ "./src/components/ui/PageLink.js");
/* harmony import */ var _styles_logos__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../styles/logos */ "./src/styles/logos.js");
/* harmony import */ var react_feather__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-feather */ "react-feather");
/* harmony import */ var react_feather__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(react_feather__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _styles_layout__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../styles/layout */ "./src/styles/layout.js");
/* harmony import */ var _components_ui_AnimatedButton__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../components/ui/AnimatedButton */ "./src/components/ui/AnimatedButton.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../hooks */ "./src/hooks/index.js");




var _jsxFileName = "/home/webnostix/Codebase/ChunkySoap2021/client/src/components/Navbar.js";

function _templateObject3() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n    position: relative;\n    background-color: ", ";\n    color: white;\n    height: 17px;\n    width: 17px;\n    border: 3px solid white;\n    border-radius: 50%;\n    text-align: center;\n    font-size: 14px;\n    font-weight: 600;\n    line-height: 17px;\n    transform: translate(-10px, -10px);\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  width: 20px;\n  height: 20px;\n  background-color: ", ";\n  margin-left: 53%;\n  margin-top: -5px;\n  transform: rotate(45deg);\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  width: 700px;\n  height: 200px;\n  background-color: ", ";\n  z-index: 13000;\n  position: absolute;\n  top: 60px;\n  border-radius: 20px;\n  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.3);\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}


















var Navbar = function Navbar(props) {
  var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_5__["useDispatch"])();
  var history = Object(react_router__WEBPACK_IMPORTED_MODULE_6__["useHistory"])();

  var _useIsAuthenticated = Object(_hooks__WEBPACK_IMPORTED_MODULE_17__["useIsAuthenticated"])(),
      isAuthenticated = _useIsAuthenticated.isAuthenticated;

  console.log('AUTH FROM HOOK', isAuthenticated);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(false),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3___default()(_useState, 2),
      loggedIn = _useState2[0],
      setLoggedIn = _useState2[1];

  Object(react__WEBPACK_IMPORTED_MODULE_4__["useEffect"])(function () {
    setLoggedIn(isAuthenticated);
    console.log("AUTHENTICATED", loggedIn);
  }, [isAuthenticated]); // console.log("AUTHED ", isAuthenticated)

  Object(react__WEBPACK_IMPORTED_MODULE_4__["useEffect"])(function () {
    if (process.browser) {
      var cartInStorage = localStorage.getItem("soap-cart");

      if (cartInStorage) {
        // setCurrentCart(JSON.parse(cartInStorage))
        dispatch({
          type: "SET_INITIAL_BASKET",
          payload: JSON.parse(cartInStorage)
        });
      }
    } // console.log("NAV HIST ", history.location.pathname);
    // fetch categories to pass to dropdown


    _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee() {
      var _categories;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(categories && categories.length)) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return");

            case 2:
              _context.next = 4;
              return _helpers__WEBPACK_IMPORTED_MODULE_7__["myApi"].send('/categories', 'GET', undefined, 'public');

            case 4:
              _categories = _context.sent;
              dispatch({
                type: "FETCH_CATEGORIES",
                payload: _categories
              });
              console.log("NAV CATEGORIES ", _categories);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  }, []);

  var _useSelector = Object(react_redux__WEBPACK_IMPORTED_MODULE_5__["useSelector"])(function (state) {
    return state.basket;
  }),
      basket = _useSelector.basket;

  var _useSelector2 = Object(react_redux__WEBPACK_IMPORTED_MODULE_5__["useSelector"])(function (state) {
    return state.categories || [];
  }),
      categories = _useSelector2.categories;

  var _useSelector3 = Object(react_redux__WEBPACK_IMPORTED_MODULE_5__["useSelector"])(function (state) {
    return state.user || {};
  }),
      user = _useSelector3.user;

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(0),
      _useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3___default()(_useState3, 2),
      key = _useState4[0],
      setKey = _useState4[1];

  console.log("CATS ", basket, user);

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(0),
      _useState6 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3___default()(_useState5, 2),
      basketTotal = _useState6[0],
      setBasketTotal = _useState6[1]; // const [basketValue] = useSelector(state => state.basket[products])
  // .reduce((item, total) => item.total_price + total))


  Object(react__WEBPACK_IMPORTED_MODULE_4__["useEffect"])(function () {
    var myArray = basket.products;
    console.log("PRODUCTS IN CART ", myArray);

    if (myArray.length > 0) {
      var totals = myArray.map(function (item) {
        return item.total_price;
      });
      var basketValue = totals.reduce(function (a, b) {
        return a + b;
      });
      setBasketTotal(basketValue.toFixed(2));
      console.log("TOTAL", basketValue);
    } else {
      setBasketTotal(0.0);
    }

    console.log("basket context ", basket.products);
  }, [basket]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_14__["Container"], {
    nav: true,
    location: history.location.pathname,
    key: key,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 79,
      columnNumber: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_styles_components_topnav__WEBPACK_IMPORTED_MODULE_8__["default"], {
    location: history && history.location.pathname,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 80,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_styles_logos__WEBPACK_IMPORTED_MODULE_12__["Logo"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 82,
      columnNumber: 11
    }
  }, "Chunky Soap Co"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_styles_components_topnav__WEBPACK_IMPORTED_MODULE_8__["NavList"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 83,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("li", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 84,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_ui_PageLink__WEBPACK_IMPORTED_MODULE_11__["default"], {
    to: "/",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 85,
      columnNumber: 13
    }
  }, "About")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("li", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 89,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_ui_PageLink__WEBPACK_IMPORTED_MODULE_11__["default"], {
    to: "/contact",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 90,
      columnNumber: 13
    }
  }, "Contact")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("li", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 92,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_ui_PageLink__WEBPACK_IMPORTED_MODULE_11__["default"], {
    to: "/category",
    withMenu: true,
    menuData: categories,
    menuTitle: "Categories",
    display: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 93,
      columnNumber: 13
    }
  }, "Categories")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("li", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 104,
      columnNumber: 11
    }
  }, _helpers_functions__WEBPACK_IMPORTED_MODULE_10__["isEmpty"](user) ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_ui_PageLink__WEBPACK_IMPORTED_MODULE_11__["default"], {
    to: "/authenticate",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 104,
      columnNumber: 35
    }
  }, "Sign In") : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("button", {
    onClick: function onClick() {
      history.push('/authenticate');
      _helpers__WEBPACK_IMPORTED_MODULE_7__["strapi"].logout(dispatch);
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 104,
      columnNumber: 85
    }
  }, "Sign Out")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("li", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 109,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_components_ui_AnimatedButton__WEBPACK_IMPORTED_MODULE_15__["default"], {
    primary: true,
    sml: true,
    text: "New Account",
    loading: "false",
    handleClick: function handleClick() {
      return history.push('/authenticate?register=true');
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 110,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_feather__WEBPACK_IMPORTED_MODULE_13__["User"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 111,
      columnNumber: 15
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("li", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 114,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_ui_PageLink__WEBPACK_IMPORTED_MODULE_11__["default"], {
    to: "/basket",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 115,
      columnNumber: 13
    }
  }, "\xA3", basket && basketTotal, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
    style: {
      marginLeft: 10,
      display: 'flex'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 118,
      columnNumber: 15
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_feather__WEBPACK_IMPORTED_MODULE_13__["ShoppingCart"], {
    color: _styles_variables__WEBPACK_IMPORTED_MODULE_9__["palette"].secondaryColor1,
    size: 28,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 119,
      columnNumber: 17
    }
  }), basket.products.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(ItemCountCircle, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 122,
      columnNumber: 15
    }
  }, basket.products.length)))))));
};

/* harmony default export */ __webpack_exports__["default"] = (Navbar);
var CategoryMenu = styled_components__WEBPACK_IMPORTED_MODULE_16___default.a.div(_templateObject(), _styles_variables__WEBPACK_IMPORTED_MODULE_9__["palette"].secondayColor);
var Pointer = styled_components__WEBPACK_IMPORTED_MODULE_16___default.a.div(_templateObject2(), _styles_variables__WEBPACK_IMPORTED_MODULE_9__["palette"].secondayColor);
var ItemCountCircle = styled_components__WEBPACK_IMPORTED_MODULE_16___default.a.div(_templateObject3(), _styles_variables__WEBPACK_IMPORTED_MODULE_9__["palette"].primaryColor1);

/***/ }),

/***/ "./src/components/OptIn.js":
/*!*********************************!*\
  !*** ./src/components/OptIn.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui */ "./src/components/ui/index.js");
/* harmony import */ var _styles_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/layout */ "./src/styles/layout.js");
var _jsxFileName = "/home/webnostix/Codebase/ChunkySoap2021/client/src/components/OptIn.js";




var OptIn = function OptIn(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_2__["Section"], {
    light: true,
    narrow: true,
    height: props.height,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_2__["Wrapper"], {
    width: 850,
    mt: 40,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__["SimpleTextInput"], {
    big: true,
    handleChange: props.handleChange,
    submitHandler: props.handleSubmit,
    withBigButton: true,
    loading: props.loading,
    value: props.searchValue,
    valid: props.valid,
    buttonText: props.btnText,
    label: props.label,
    type: "text",
    placeholder: props.placeholder,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9,
      columnNumber: 17
    }
  })));
};

OptIn.defaultProps = {
  btnText: 'Button Text',
  height: 200,
  placeholder: "pass placeholder prop",
  handleChange: function handleChange() {},
  submitHandler: function submitHandler() {}
};
/* harmony default export */ __webpack_exports__["default"] = (OptIn);

/***/ }),

/***/ "./src/components/PrivateRoute.js":
/*!****************************************!*\
  !*** ./src/components/PrivateRoute.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "@babel/runtime/helpers/extends");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "@babel/runtime/helpers/defineProperty");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "@babel/runtime/helpers/objectWithoutProperties");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../hooks */ "./src/hooks/index.js");
/* harmony import */ var _helpers_auth__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../helpers/auth */ "./src/helpers/auth.js");



var _jsxFileName = "/home/webnostix/Codebase/ChunkySoap2021/client/src/components/PrivateRoute.js";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }



 // Helpers



function PrivateRoute(_ref) {
  var Component = _ref.component,
      rest = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2___default()(_ref, ["component"]);

  var _useIsAuthenticated = Object(_hooks__WEBPACK_IMPORTED_MODULE_5__["useIsAuthenticated"])(),
      isAuthenticated = _useIsAuthenticated.isAuthenticated;

  console.log("PROTECTED ", _objectSpread({}, rest));
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["Route"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
    exact: true
  }, rest, {
    render: function render(props) {
      return !isAuthenticated // remove ! to make private
      ?
      /*#__PURE__*/
      react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Component, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, props, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 17,
          columnNumber: 7
        }
      })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["Redirect"], {
        to: {
          pathname: "/authenticate",
          state: {
            from: props.location
          }
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 19,
          columnNumber: 9
        }
      });
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 5
    }
  }));
}

/* harmony default export */ __webpack_exports__["default"] = (PrivateRoute);

/***/ }),

/***/ "./src/components/ProductPreview.js":
/*!******************************************!*\
  !*** ./src/components/ProductPreview.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_feather__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-feather */ "react-feather");
/* harmony import */ var react_feather__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_feather__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _styles_ui__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../styles/ui */ "./src/styles/ui/index.js");
/* harmony import */ var _components_ui_AddToCartBtn__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/ui/AddToCartBtn */ "./src/components/ui/AddToCartBtn.js");
/* harmony import */ var _components_ui_AnimatedButton__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/ui/AnimatedButton */ "./src/components/ui/AnimatedButton.js");
/* harmony import */ var _styles_ui_productFrame__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../styles/ui/productFrame */ "./src/styles/ui/productFrame.js");
/* harmony import */ var _styles_layout__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../styles/layout */ "./src/styles/layout.js");
/* harmony import */ var _styles_typography__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../styles/typography */ "./src/styles/typography.js");
/* harmony import */ var _helpers_functions__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../helpers/functions */ "./src/helpers/functions.js");

var _jsxFileName = "/home/webnostix/Codebase/ChunkySoap2021/client/src/components/ProductPreview.js";

function _templateObject3() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    align-items: flex-start;\n    max-width: 600px;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n    display: flex;\n    flex-direction: column;\n    min-height: 220px;\n    max-height: 600px;>\n    max-width: 550px;\n    margin: 0px 25px 0px 40px;\n    margin-top: 50px;\n    z-index: 2;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    min-height: 400px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}














var ProductPreview = function ProductPreview(props) {
  var history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["useHistory"])();

  var _useSelector = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useSelector"])(function (state) {
    return state.basket;
  }),
      basket = _useSelector.basket;

  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    console.log("PREVEW BASKET", basket.products);
  }, [basket]); // const router = useRouter()

  var _props$product = props.product,
      id = _props$product.id,
      product_picture_1 = _props$product.product_picture_1,
      product_name = _props$product.product_name,
      product_short_description = _props$product.product_short_description,
      product_long_description = _props$product.product_long_description,
      product_price = _props$product.product_price,
      product_discount = _props$product.product_discount;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(ProductInfo, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", {
    src: "/drips-dark.svg",
    style: {
      position: 'absolute',
      width: 500,
      top: 0,
      right: 0,
      opacity: 0.8,
      zIndex: 1
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28,
      columnNumber: 17
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_styles_ui_productFrame__WEBPACK_IMPORTED_MODULE_9__["default"], {
    style: {
      marginTop: 30
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", {
    src: product_picture_1 && "".concat("http://localhost:1337").concat(product_picture_1.url),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 21
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(ProductText, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_11__["Heading1"], {
    style: {
      flex: 1
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 21
    }
  }, product_name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_11__["Heading3"], {
    style: {
      flex: 1
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 21
    }
  }, product_short_description), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_11__["Paragraph"], {
    style: {
      flex: 4
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 21
    }
  }, _helpers_functions__WEBPACK_IMPORTED_MODULE_12__["createExcerpt"](product_long_description, 100), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_styles_ui__WEBPACK_IMPORTED_MODULE_6__["LinkButton"], {
    onClick: function onClick() {
      return props.viewProduct(id);
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36,
      columnNumber: 21
    }
  }, " More info")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(InlinePrices, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 21
    }
  }, product_discount > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'baseline',
      opacity: 0.4
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 25
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_11__["Heading3"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41,
      columnNumber: 25
    }
  }, "Original Price. "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_11__["Heading1"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42,
      columnNumber: 25
    }
  }, "\xA3", product_price.toFixed(2))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'baseline'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_11__["Heading3"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46,
      columnNumber: 21
    }
  }, product_discount > 0 ? 'Sale Price.' : 'Price.'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_11__["Heading1"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 21
    }
  }, "\xA3", (product_price - product_price * product_discount / 100).toFixed(2)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_10__["ButtonRow"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_ui_AddToCartBtn__WEBPACK_IMPORTED_MODULE_7__["default"], {
    product: props.product,
    "function": "add",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51,
      columnNumber: 25
    }
  }), basket.products.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_ui_AnimatedButton__WEBPACK_IMPORTED_MODULE_8__["default"], {
    tertiary: true,
    fixed: true,
    text: "View Basket",
    med: true,
    handleClick: function handleClick() {
      return history.push('/basket');
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53,
      columnNumber: 29
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_feather__WEBPACK_IMPORTED_MODULE_5__["Layers"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56,
      columnNumber: 33
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_ui_AnimatedButton__WEBPACK_IMPORTED_MODULE_8__["default"], {
    text: "More info",
    med: true,
    handleClick: function handleClick() {
      return props.viewProduct(id);
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59,
      columnNumber: 25
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_feather__WEBPACK_IMPORTED_MODULE_5__["Layers"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62,
      columnNumber: 29
    }
  }))))));
};

/* harmony default export */ __webpack_exports__["default"] = (ProductPreview);
var ProductInfo = styled_components__WEBPACK_IMPORTED_MODULE_4___default.a.div(_templateObject());
var ProductText = styled_components__WEBPACK_IMPORTED_MODULE_4___default.a.div(_templateObject2());
var InlinePrices = styled_components__WEBPACK_IMPORTED_MODULE_4___default.a.div(_templateObject3());

/***/ }),

/***/ "./src/components/ProductSearch.js":
/*!*****************************************!*\
  !*** ./src/components/ProductSearch.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "@babel/runtime/helpers/defineProperty");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var fuse_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! fuse.js */ "fuse.js");
/* harmony import */ var fuse_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(fuse_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! . */ "./src/components/index.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../helpers */ "./src/helpers/index.js");




var _jsxFileName = "/home/webnostix/Codebase/ChunkySoap2021/client/src/components/ProductSearch.js";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }








var ProductSearch = function ProductSearch(props) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])({}),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3___default()(_useState, 2),
      searchTerm = _useState2[0],
      setSearchTerm = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(false),
      _useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3___default()(_useState3, 2),
      loading = _useState4[0],
      setLoading = _useState4[1];

  var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_6__["useDispatch"])();
  var history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_5__["useHistory"])();
  console.log("PROD SEARCH LOC :", history);

  var searchFilter = function searchFilter(products) {
    var fuse = new fuse_js__WEBPACK_IMPORTED_MODULE_7___default.a(products, {
      keys: ['product_name', 'product_long_description', 'product_short_description'],
      includeScore: true
    });
    var result = fuse.search(searchTerm.term);
    var filtered = result.filter(function (el) {
      return el.score < 0.6;
    }).map(function (i) {
      return i.item;
    });
    console.log("FILTERED: ", filtered);
    return filtered;
  };

  Object(react__WEBPACK_IMPORTED_MODULE_4__["useEffect"])(function () {
    // if on search page run everytimr chenges and don't redirect
    console.log("Search for: ", searchTerm);
  }, [searchTerm]);

  var getData = /*#__PURE__*/function () {
    var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee() {
      var products, filtered;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setLoading(true);
              console.log('pulling data from server ', searchTerm);
              _context.next = 4;
              return _helpers__WEBPACK_IMPORTED_MODULE_9__["myApi"].send("/products", "GET", undefined, "public");

            case 4:
              products = _context.sent;
              // filter result accoring to search term
              filtered = searchFilter(products);
              console.log("filtered results: ", filtered); // add result to search results state object

              dispatch({
                type: 'UPDATE_SEARCH',
                payload: filtered
              }); // redirect to search results page

              setSearchTerm({});
              setLoading(false);
              history.push('/search-results');

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function getData() {
      return _ref.apply(this, arguments);
    };
  }();

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(___WEBPACK_IMPORTED_MODULE_8__["OptIn"], {
    height: 180,
    cols: "100%",
    valid: false,
    loading: loading,
    placeholder: "type product name here",
    btnText: "Search",
    searchValue: searchTerm.term,
    label: "Search our catalogue for your favorite products",
    handleChange: function handleChange(e) {
      setSearchTerm(_objectSpread(_objectSpread({}, searchTerm), {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, 'term', e.target.value)));
    },
    handleSubmit: function handleSubmit() {
      return getData();
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55,
      columnNumber: 11
    }
  });
};

/* harmony default export */ __webpack_exports__["default"] = (ProductSearch);

/***/ }),

/***/ "./src/components/ShippingOptions.js":
/*!*******************************************!*\
  !*** ./src/components/ShippingOptions.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_ui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/ui */ "./src/components/ui/index.js");
/* harmony import */ var _styles_layout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../styles/layout */ "./src/styles/layout.js");
/* harmony import */ var react_feather__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-feather */ "react-feather");
/* harmony import */ var react_feather__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_feather__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../helpers */ "./src/helpers/index.js");
/* harmony import */ var _helpers_functions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../helpers/functions */ "./src/helpers/functions.js");



var _jsxFileName = "/home/webnostix/Codebase/ChunkySoap2021/client/src/components/ShippingOptions.js";








var ShippingOptions = function ShippingOptions(_ref) {
  var dispatch = _ref.dispatch,
      cartDispatch = _ref.cartDispatch;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])([]),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_useState, 2),
      options = _useState2[0],
      setOptions = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(),
      _useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_useState3, 2),
      currentOption = _useState4[0],
      setCurrentOption = _useState4[1];

  var _useSelector = Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["useSelector"])(function (state) {
    return state.basket;
  }),
      basket = _useSelector.basket;

  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    apiCall();
  }, []);
  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    var shippingDetails = options.find(function (el) {
      return el._id === currentOption;
    });
    console.log("selected shipping ", shippingDetails);
    var shippingCost = 0;

    if (shippingDetails) {
      var shipping_cost = shippingDetails.shipping_cost,
          id = shippingDetails.id;

      if (_helpers_functions__WEBPACK_IMPORTED_MODULE_9__["getCartTotal"](basket.products) > 25 && shipping_cost < 4) {
        console.log("CART_TOTAL ", _helpers_functions__WEBPACK_IMPORTED_MODULE_9__["getCartTotal"](basket.products));
        shippingCost = 0;
      } else {
        shippingCost = shipping_cost;
      }

      dispatch({
        type: "SET_POSTAGE",
        payload: {
          shipping_cost: shippingCost,
          id: id
        }
      });
      cartDispatch({
        type: "SET_POSTAGE",
        payload: shippingDetails
      });
      console.log("COST ", shippingCost);
    }
  }, [currentOption]);

  var apiCall = /*#__PURE__*/function () {
    var _ref2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
      var result;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _helpers__WEBPACK_IMPORTED_MODULE_8__["myApi"].send('/shippings', 'GET', undefined, 'public');

            case 2:
              result = _context.sent;
              // const result = await response.json()
              console.log("SHIPPING ", result);
              setOptions(result); //TODO: If value is over 25 make standard Royal mail default

              setCurrentOption(result[0]._id);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function apiCall() {
      return _ref2.apply(this, arguments);
    };
  }();

  var selectOption = function selectOption(_id) {
    console.log("CHECKED ", _id);
    setCurrentOption(_id);
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53,
      columnNumber: 13
    }
  }, options && options.map(function (el, i) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_components_ui__WEBPACK_IMPORTED_MODULE_5__["ShippingOption"], {
      active: currentOption,
      selected: currentOption,
      checked: selectOption,
      option: el,
      key: i,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 56,
        columnNumber: 25
      }
    });
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_6__["ButtonRow"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_components_ui__WEBPACK_IMPORTED_MODULE_5__["AnimatedButton"], {
    big: true,
    secondary: true,
    text: "Back",
    handleClick: function handleClick() {
      return cartDispatch({
        type: 'PREV_STEP'
      });
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_feather__WEBPACK_IMPORTED_MODULE_7__["ArrowLeft"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61,
      columnNumber: 113
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_components_ui__WEBPACK_IMPORTED_MODULE_5__["AnimatedButton"], {
    big: true,
    text: "Continue",
    handleClick: function handleClick() {
      return cartDispatch({
        type: 'NEXT_STEP'
      });
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62,
      columnNumber: 17
    }
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (ShippingOptions);

/***/ }),

/***/ "./src/components/StripePay.js":
/*!*************************************!*\
  !*** ./src/components/StripePay.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "@babel/runtime/helpers/defineProperty");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _stripe_react_stripe_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @stripe/react-stripe-js */ "@stripe/react-stripe-js");
/* harmony import */ var _stripe_react_stripe_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_stripe_react_stripe_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _components_ui__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/ui */ "./src/components/ui/index.js");
/* harmony import */ var _styles_typography__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../styles/typography */ "./src/styles/typography.js");
/* harmony import */ var _styles_layout__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../styles/layout */ "./src/styles/layout.js");
/* harmony import */ var _styles_variables__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../styles/variables */ "./src/styles/variables.js");
/* harmony import */ var _helpers_functions__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../helpers/functions */ "./src/helpers/functions.js");
/* harmony import */ var _helpers___WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../helpers/ */ "./src/helpers/index.js");





var _jsxFileName = "/home/webnostix/Codebase/ChunkySoap2021/client/src/components/StripePay.js";

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n    width: 100%;\n    padding: 15px;\n    border-radius: 15px;\n    ", "\n    border: 2px ", " solid;\n    ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}












var StripePay = function StripePay(_ref) {
  var _React$createElement;

  var cartDispatch = _ref.cartDispatch;

  var _useSelector = Object(react_redux__WEBPACK_IMPORTED_MODULE_7__["useSelector"])(function (state) {
    return state.basket;
  }),
      basket = _useSelector.basket;

  var _useSelector2 = Object(react_redux__WEBPACK_IMPORTED_MODULE_7__["useSelector"])(function (state) {
    return state.user;
  }),
      user = _useSelector2.user;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(false),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_4___default()(_useState, 2),
      isLoading = _useState2[0],
      setIsLoading = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(""),
      _useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_4___default()(_useState3, 2),
      errorMessage = _useState4[0],
      setErrorMessage = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(0.00),
      _useState6 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_4___default()(_useState5, 2),
      cartTotal = _useState6[0],
      setCartTotal = _useState6[1];

  var _useState7 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(null),
      _useState8 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_4___default()(_useState7, 2),
      orderId = _useState8[0],
      setOrderId = _useState8[1];

  var elements = Object(_stripe_react_stripe_js__WEBPACK_IMPORTED_MODULE_6__["useElements"])();
  var stripe = Object(_stripe_react_stripe_js__WEBPACK_IMPORTED_MODULE_6__["useStripe"])();
  var customer_title = user.customer_title,
      customer_firstname = user.customer_firstname,
      customer_lastname = user.customer_lastname,
      customer_email = user.customer_email,
      customer_address1 = user.customer_address1,
      customer_address2 = user.customer_address2,
      customer_postcode = user.customer_postcode,
      customer_town = user.customer_town;
  var postage = basket.postage,
      products = basket.products,
      carrierId = basket.carrierId;
  Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () {
    console.log('PAYMENT BASKET', basket, "USER", user);
    var totalToPay = _helpers_functions__WEBPACK_IMPORTED_MODULE_13__["getCartTotal"](products, postage);
    setCartTotal(totalToPay.toFixed(2));
  }, [basket]);
  Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () {
    cartTotal > 0 && createOrder();
  }, [cartTotal]);

  var createOrder = /*#__PURE__*/function () {
    var _ref2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee() {
      var completed,
          newOrder,
          _yield$myApi$send,
          id,
          _args = arguments;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              completed = _args.length > 0 && _args[0] !== undefined ? _args[0] : false;

              if (!orderId) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return");

            case 3:
              newOrder = {
                order_customer: user._id,
                order_total: cartTotal,
                order_date: new Date(),
                order_dispatched: false,
                order_confirmed: completed,
                order_items: basket,
                order_postage: postage,
                order_carrier: carrierId
              };
              _context.prev = 4;
              _context.next = 7;
              return _helpers___WEBPACK_IMPORTED_MODULE_14__["myApi"].send('/orders', 'POST', newOrder);

            case 7:
              _yield$myApi$send = _context.sent;
              id = _yield$myApi$send.id;
              setOrderId(id);
              _context.next = 15;
              break;

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](4);
              console.log("ERROR CREATING ORDER ", _context.t0);

            case 15:
              console.log("ORDER OBJECT ", newOrder);

            case 16:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[4, 12]]);
    }));

    return function createOrder() {
      return _ref2.apply(this, arguments);
    };
  }();

  var errorHandle = function errorHandle(response) {
    console.log("ERROR HANDLING ", response);
  };

  var cardElementOptions = {
    style: {
      base: {
        fontSize: '24px',
        color: _styles_variables__WEBPACK_IMPORTED_MODULE_12__["palette"].primaryColor,
        "::placeholder": {
          color: _styles_variables__WEBPACK_IMPORTED_MODULE_12__["palette"].colorGray4
        }
      },
      invalid: {},
      complete: {}
    },
    hidePostalCode: true
  };

  var handleFormSubmit = /*#__PURE__*/function () {
    var _ref3 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee2(e) {
      var billingDetails, myHeaders, requestOptions, result, clientSecret, cardElement, paymentMethodRequest, _ref4, message, confirmedCardPayment, data;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              e.preventDefault();
              console.log("Submitting ", e);
              setIsLoading(true); // put billing details in to an object

              billingDetails = {
                name: "".concat(customer_title, " ").concat(customer_firstname, " ").concat(customer_lastname),
                email: customer_email,
                address: {
                  city: customer_town,
                  line1: customer_address1,
                  state: customer_town,
                  postal_code: customer_postcode
                }
              };
              myHeaders = new Headers();
              myHeaders.append('Content-Type', 'application/json');
              requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
              };
              _context2.next = 9;
              return fetch("/api/payment_intents/?amount=".concat((cartTotal * 100).toFixed(0)), requestOptions);

            case 9:
              result = _context2.sent;
              _context2.next = 12;
              return result.text();

            case 12:
              clientSecret = _context2.sent;
              console.log("STRIPE ENDPOINT ", clientSecret); // error handle
              // setErrorMessage(errorHandle(clientSecret))
              // need reference to card element

              cardElement = elements.getElement(_stripe_react_stripe_js__WEBPACK_IMPORTED_MODULE_6__["CardElement"]); // need stripejs
              // create a payment object

              _context2.prev = 15;
              _context2.next = 18;
              return stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
                billing_details: billingDetails
              });

            case 18:
              paymentMethodRequest = _context2.sent;

              if (!paymentMethodRequest.hasOwnProperty('error')) {
                _context2.next = 25;
                break;
              }

              _ref4 = paymentMethodRequest.error || '', message = _ref4.message;
              console.log("PAYMENT METHOD REQUEST ", message); // errorHandle(errorMessage)

              setIsLoading(false);
              message && setErrorMessage(message);
              return _context2.abrupt("return");

            case 25:
              _context2.next = 27;
              return stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethodRequest.paymentMethod.id
              });

            case 27:
              confirmedCardPayment = _context2.sent;
              console.log(confirmedCardPayment);
              setIsLoading(false); //  Mark order as completed in database

              data = {
                order_confirmed: true
              };
              _context2.next = 33;
              return _helpers___WEBPACK_IMPORTED_MODULE_14__["myApi"].send("/orders/".concat(orderId), 'PUT', data);

            case 33:
              // Remove cart from local storage
              // Payment completed step redirect to success step
              cartDispatch({
                type: "CHECKOUT_SUCCESS"
              });
              _context2.next = 41;
              break;

            case 36:
              _context2.prev = 36;
              _context2.t0 = _context2["catch"](15);
              console.log("PAYMENT REQ ERR ", _context2.t0);
              setIsLoading(false);
              return _context2.abrupt("return");

            case 41:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[15, 36]]);
    }));

    return function handleFormSubmit(_x) {
      return _ref3.apply(this, arguments);
    };
  }();

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_11__["Frame"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 149,
      columnNumber: 10
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("form", {
    onSubmit: function onSubmit(e) {
      return handleFormSubmit(e);
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 150,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_11__["FrameHeader"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 151,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_10__["SubHeading1"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 152,
      columnNumber: 17
    }
  }, "Secure Payment")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_11__["FrameBody"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 156,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(CardElementWrapper, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 157,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_stripe_react_stripe_js__WEBPACK_IMPORTED_MODULE_6__["CardElement"], {
    withUpdate: function withUpdate(e) {
      return console.log(e.value);
    },
    options: cardElementOptions,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 158,
      columnNumber: 21
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_10__["Paragraph"], {
    danger: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 160,
      columnNumber: 17
    }
  }, errorMessage && errorMessage)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_11__["FrameFooter"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 164,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_11__["ButtonRow"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 165,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_components_ui__WEBPACK_IMPORTED_MODULE_9__["AnimatedButton"], (_React$createElement = {
    secondary: true,
    big: true,
    type: "button"
  }, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_React$createElement, "big", true), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_React$createElement, "text", "Back"), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_React$createElement, "handleClick", function handleClick() {
    return cartDispatch({
      type: 'PREV_STEP'
    });
  }), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_React$createElement, "__source", {
    fileName: _jsxFileName,
    lineNumber: 166,
    columnNumber: 21
  }), _React$createElement)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_components_ui__WEBPACK_IMPORTED_MODULE_9__["AnimatedButton"], {
    loading: isLoading,
    type: "submit",
    big: true,
    text: "Pay " + "\xA3" + cartTotal,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 167,
      columnNumber: 21
    }
  })))));
};

/* harmony default export */ __webpack_exports__["default"] = (StripePay);
var CardElementWrapper = styled_components__WEBPACK_IMPORTED_MODULE_8___default.a.div(_templateObject(), ''
/* height: 60px; */
, _styles_variables__WEBPACK_IMPORTED_MODULE_12__["palette"].primaryColor, ''
/* box-shadow: 4px 4px 6px  rgba(0,0,0, 0.1); */
);

/***/ }),

/***/ "./src/components/admin/OrderItemDetail.js":
/*!*************************************************!*\
  !*** ./src/components/admin/OrderItemDetail.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_feather__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-feather */ "react-feather");
/* harmony import */ var react_feather__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_feather__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "/home/webnostix/Codebase/ChunkySoap2021/client/src/components/admin/OrderItemDetail.js";




var OrderItemDetail = function OrderItemDetail(props) {
  var products = props.items.products;
  var item = props.item,
      id = props.id;
  console.log("ORDER DEETS ", props);

  var renderItems = function renderItems() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      style: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '10px',
        borderBottom: '1px solid black'
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 14,
        columnNumber: 13
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      style: {
        width: '100%'
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 15,
        columnNumber: 17
      }
    }, "Product"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      style: {
        width: '100%'
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 18,
        columnNumber: 17
      }
    }, "Price"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      style: {
        width: '100%'
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 21,
        columnNumber: 17
      }
    }, "Quantity"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      style: {
        width: '100%'
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 24,
        columnNumber: 17
      }
    }, "Total Price")), products && products.map(function (item, i) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          flexBasis: 1,
          flexGrow: 1
        },
        key: item._id,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 30,
          columnNumber: 17
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: {
          width: '100%'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 31,
          columnNumber: 21
        }
      }, item.product_name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: {
          width: '100%'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 34,
          columnNumber: 21
        }
      }, "$", item.product_price), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: {
          width: '100%'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 37,
          columnNumber: 21
        }
      }, item.product_qty), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: {
          width: '100%'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 40,
          columnNumber: 21
        }
      }, "$", item.total_price.toFixed(2)));
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'row',
        borderTop: '1px solid black',
        margin: '10px 0px',
        justifyContent: 'space-around',
        padding: '10px 0px',
        alignItems: 'center'
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 46,
        columnNumber: 13
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      style: {
        width: '100%'
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 47,
        columnNumber: 17
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      style: {
        width: '100%'
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 48,
        columnNumber: 17
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      style: {
        width: '100%'
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 49,
        columnNumber: 17
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      style: {
        width: '100%'
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 50,
        columnNumber: 17
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
      to: "/admin/invoices/".concat(id),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 50,
        columnNumber: 48
      }
    }, "View Invoice: ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_feather__WEBPACK_IMPORTED_MODULE_2__["FileText"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 51,
        columnNumber: 31
      }
    })))));
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    style: {
      marginBotton: '50',
      padding: '10px 90px',
      transition: 'all 0.3s ease-in'
    },
    className: item === id ? 'visible' : 'hidden',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60,
      columnNumber: 9
    }
  }, renderItems());
};

/* harmony default export */ __webpack_exports__["default"] = (OrderItemDetail);

/***/ }),

/***/ "./src/components/admin/OrderListItem.js":
/*!***********************************************!*\
  !*** ./src/components/admin/OrderListItem.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _helpers_functions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../helpers/functions */ "./src/helpers/functions.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ */ "./src/components/admin/index.js");
/* harmony import */ var _styles_variables__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../styles/variables */ "./src/styles/variables.js");
/* harmony import */ var react_feather__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-feather */ "react-feather");
/* harmony import */ var react_feather__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_feather__WEBPACK_IMPORTED_MODULE_6__);

var _jsxFileName = "/home/webnostix/Codebase/ChunkySoap2021/client/src/components/admin/OrderListItem.js";







var OrderListItem = function OrderListItem(_ref) {
  var order = _ref.order;
  var order_total = order.order_total,
      createdAt = order.createdAt,
      _id = order._id,
      order_items = order.order_items;
  var _order$order_customer = order.order_customer,
      customer_firstname = _order$order_customer.customer_firstname,
      customer_lastname = _order$order_customer.customer_lastname;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState, 2),
      currentItem = _useState2[0],
      setCurrentItem = _useState2[1];

  console.log("ORDER_ITEM ", order_total);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18,
      columnNumber: 12
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    style: {
      padding: '5px 90px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: "1px",
      justifyItems: 'left',
      borderBottom: "2px solid ".concat(_styles_variables__WEBPACK_IMPORTED_MODULE_5__["palette"].colorGray10)
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20,
      columnNumber: 13
    }
  }, _helpers_functions__WEBPACK_IMPORTED_MODULE_3__["convertDate"](createdAt)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 13
    }
  }, "$ ", order_total), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 13
    }
  }, customer_firstname, " ", customer_lastname), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 13
    }
  }, order.order_carrier.shipping_carrier), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    secondary: true,
    sml: true,
    onClick: function onClick() {
      currentItem === _id ? setCurrentItem(null) : setCurrentItem(_id);
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 17
    }
  }, currentItem === null ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_feather__WEBPACK_IMPORTED_MODULE_6__["MoreHorizontal"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 44
    }
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_feather__WEBPACK_IMPORTED_MODULE_6__["ChevronUp"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 65
    }
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(___WEBPACK_IMPORTED_MODULE_4__["OrderItemDetail"], {
    items: order_items,
    id: _id,
    item: currentItem,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 13
    }
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (OrderListItem);

/***/ }),

/***/ "./src/components/admin/index.js":
/*!***************************************!*\
  !*** ./src/components/admin/index.js ***!
  \***************************************/
/*! exports provided: OrderListItem, OrderItemDetail */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _OrderListItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OrderListItem */ "./src/components/admin/OrderListItem.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OrderListItem", function() { return _OrderListItem__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _OrderItemDetail__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OrderItemDetail */ "./src/components/admin/OrderItemDetail.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OrderItemDetail", function() { return _OrderItemDetail__WEBPACK_IMPORTED_MODULE_1__["default"]; });




/***/ }),

/***/ "./src/components/checkOutReducer.js":
/*!*******************************************!*\
  !*** ./src/components/checkOutReducer.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "@babel/runtime/helpers/defineProperty");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var initialState = {
  step: 1
};

var checkoutReducer = function checkoutReducer(state, action) {
  switch (action.type) {
    case 'STANDARD_CHECKOUT':
      return _objectSpread(_objectSpread({}, state), {}, {
        authenticated: false,
        guest: null,
        step: 1
      });

    case 'GUEST_CHECKOUT':
      return _objectSpread(_objectSpread({}, state), {}, {
        guest: true,
        step: 1
      });

    case 'NEXT_STEP':
      return _objectSpread(_objectSpread({}, state), {}, {
        step: state.step + 1
      });

    case 'PREV_STEP':
      return _objectSpread(_objectSpread({}, state), {}, {
        step: state.step - 1
      });

    case "LOGGING_IN":
      return _objectSpread(_objectSpread({}, state), {}, {
        authenticated: false,
        // guest: false,
        loading: true
      });

    case "LOGIN_FAIL":
      return _objectSpread(_objectSpread({}, state), {}, {
        loading: false,
        step: 1,
        guest: null,
        errorMsg: action.payload,
        authenticated: false
      });

    case "LOGGED_IN":
      return _objectSpread(_objectSpread({}, state), {}, {
        authenticated: true,
        guest: false,
        loading: false,
        fields: {}
      });

    case "CHECKOUT_SUCCESS":
      return _objectSpread(_objectSpread({}, state), {}, {
        step: 4,
        loading: false
      });

    case "SET_POSTAGE":
      return _objectSpread(_objectSpread({}, state), {}, {
        postage: action.payload
      });

    case 'UPDATE_FIELD':
      console.log("UPDATING IN REDUCER", action.fieldName, action.fieldValue);
      return _objectSpread(_objectSpread({}, state), {}, {
        fields: _objectSpread(_objectSpread({}, state.fields), {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, action.fieldName, action.fieldValue))
      });

    case 'CLEAR_FIELDS':
      return _objectSpread(_objectSpread({}, state), {}, {
        fields: _objectSpread(_objectSpread({}, state.fields), {}, {
          password: '',
          username: '',
          identifier: ''
        })
      });

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (checkoutReducer);

/***/ }),

/***/ "./src/components/index.js":
/*!*********************************!*\
  !*** ./src/components/index.js ***!
  \*********************************/
/*! exports provided: checkoutReducer, CheckoutSteps, CheckoutSuccess, LoginForm, EditBilling, ShippingOptions, StripePay, OptIn, Modal, ProductPreview, Footer, Hero, ProductSearch, CategoryRow, PrivateRoute */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _checkOutReducer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./checkOutReducer */ "./src/components/checkOutReducer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "checkoutReducer", function() { return _checkOutReducer__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _CheckoutSteps__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CheckoutSteps */ "./src/components/CheckoutSteps.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CheckoutSteps", function() { return _CheckoutSteps__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _CheckoutSuccess__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CheckoutSuccess */ "./src/components/CheckoutSuccess.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CheckoutSuccess", function() { return _CheckoutSuccess__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _LoginForm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LoginForm */ "./src/components/LoginForm.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LoginForm", function() { return _LoginForm__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _CheckoutEditBilling__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CheckoutEditBilling */ "./src/components/CheckoutEditBilling.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EditBilling", function() { return _CheckoutEditBilling__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _ShippingOptions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ShippingOptions */ "./src/components/ShippingOptions.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ShippingOptions", function() { return _ShippingOptions__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _StripePay__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./StripePay */ "./src/components/StripePay.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StripePay", function() { return _StripePay__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _OptIn__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./OptIn */ "./src/components/OptIn.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OptIn", function() { return _OptIn__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Modal */ "./src/components/Modal.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Modal", function() { return _Modal__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _ProductPreview__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ProductPreview */ "./src/components/ProductPreview.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ProductPreview", function() { return _ProductPreview__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* harmony import */ var _Footer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Footer */ "./src/components/Footer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Footer", function() { return _Footer__WEBPACK_IMPORTED_MODULE_10__["default"]; });

/* harmony import */ var _Hero__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Hero */ "./src/components/Hero.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Hero", function() { return _Hero__WEBPACK_IMPORTED_MODULE_11__["default"]; });

/* harmony import */ var _ProductSearch__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./ProductSearch */ "./src/components/ProductSearch.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ProductSearch", function() { return _ProductSearch__WEBPACK_IMPORTED_MODULE_12__["default"]; });

/* harmony import */ var _CategoryRow__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./CategoryRow */ "./src/components/CategoryRow.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CategoryRow", function() { return _CategoryRow__WEBPACK_IMPORTED_MODULE_13__["default"]; });

/* harmony import */ var _PrivateRoute__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./PrivateRoute */ "./src/components/PrivateRoute.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PrivateRoute", function() { return _PrivateRoute__WEBPACK_IMPORTED_MODULE_14__["default"]; });

















/***/ }),

/***/ "./src/components/layout/WithHero.js":
/*!*******************************************!*\
  !*** ./src/components/layout/WithHero.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "@babel/runtime/helpers/extends");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _styles_typography__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../styles/typography */ "./src/styles/typography.js");
/* harmony import */ var _styles_layout__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../styles/layout */ "./src/styles/layout.js");
/* harmony import */ var _styles_variables__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../styles/variables */ "./src/styles/variables.js");
/* harmony import */ var _styles_ui__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../styles/ui */ "./src/styles/ui/index.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../ */ "./src/components/index.js");






var _jsxFileName = "/home/webnostix/Codebase/ChunkySoap2021/client/src/components/layout/WithHero.js";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }








var withHero = function withHero(_ref) {
  var Component = _ref.component;
  return /*#__PURE__*/function (_React$Component) {
    _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(Returned, _React$Component);

    var _super = _createSuper(Returned);

    function Returned() {
      _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, Returned);

      return _super.apply(this, arguments);
    }

    _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(Returned, [{
      key: "render",
      value: function render() {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_6___default.a.Fragment, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 12,
            columnNumber: 17
          }
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(___WEBPACK_IMPORTED_MODULE_11__["Hero"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 13,
            columnNumber: 21
          }
        })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(Component, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 14,
            columnNumber: 21
          }
        })));
      }
    }]);

    return Returned;
  }(react__WEBPACK_IMPORTED_MODULE_6___default.a.Component);
};

/* harmony default export */ __webpack_exports__["default"] = (withHero);

/***/ }),

/***/ "./src/components/layout/WithNavbar.js":
/*!*********************************************!*\
  !*** ./src/components/layout/WithNavbar.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Navbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Navbar */ "./src/components/Navbar.js");
var _jsxFileName = "/home/webnostix/Codebase/ChunkySoap2021/client/src/components/layout/WithNavbar.js";



var WithNavbar = function WithNavbar(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Navbar__WEBPACK_IMPORTED_MODULE_1__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7,
      columnNumber: 9
    }
  }), props.children);
};

/* harmony default export */ __webpack_exports__["default"] = (WithNavbar);

/***/ }),

/***/ "./src/components/layout/index.js":
/*!****************************************!*\
  !*** ./src/components/layout/index.js ***!
  \****************************************/
/*! exports provided: WithNavbar, withHero */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _WithNavbar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WithNavbar */ "./src/components/layout/WithNavbar.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WithNavbar", function() { return _WithNavbar__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _WithHero__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WithHero */ "./src/components/layout/WithHero.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "withHero", function() { return _WithHero__WEBPACK_IMPORTED_MODULE_1__["default"]; });




/***/ }),

/***/ "./src/components/ui/AddToCartBtn.js":
/*!*******************************************!*\
  !*** ./src/components/ui/AddToCartBtn.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "@babel/runtime/helpers/toConsumableArray");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _styles_components_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../styles/components/button */ "./src/styles/components/button.js");
/* harmony import */ var _ui_AnimatedButton__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../ui/AnimatedButton */ "./src/components/ui/AnimatedButton.js");
/* harmony import */ var react_loader_spinner__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-loader-spinner */ "react-loader-spinner");
/* harmony import */ var react_loader_spinner__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_loader_spinner__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_loader_spinner_dist_loader_css_react_spinner_loader_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-loader-spinner/dist/loader/css/react-spinner-loader.css */ "./node_modules/react-loader-spinner/dist/loader/css/react-spinner-loader.css");
/* harmony import */ var react_loader_spinner_dist_loader_css_react_spinner_loader_css__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_loader_spinner_dist_loader_css_react_spinner_loader_css__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react_feather__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-feather */ "react-feather");
/* harmony import */ var react_feather__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_feather__WEBPACK_IMPORTED_MODULE_10__);



var _jsxFileName = "/home/webnostix/Codebase/ChunkySoap2021/client/src/components/ui/AddToCartBtn.js";

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  cursor: pointer;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}










var AddToCart = function AddToCart(props) {
  var _useSelector = Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["useSelector"])(function (state) {
    return state.basket;
  }),
      basket = _useSelector.basket;

  var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["useDispatch"])();

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])([]),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_useState, 2),
      currentCart = _useState2[0],
      setCurrentCart = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(false),
      _useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_useState3, 2),
      loading = _useState4[0],
      setLoading = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(false),
      _useState6 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_useState5, 2),
      added = _useState6[0],
      setAdded = _useState6[1];

  var _props$product = props.product,
      _id = _props$product._id,
      product_name = _props$product.product_name,
      product_short_description = _props$product.product_short_description,
      product_price = _props$product.product_price,
      product_picture_1 = _props$product.product_picture_1,
      product_discount = _props$product.product_discount;
  var _props$quantity = props.quantity,
      quantity = _props$quantity === void 0 ? 1 : _props$quantity;
  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    if (process.browser) {
      var cartInStorage = localStorage.getItem('soap-cart');

      if (cartInStorage) {
        setCurrentCart(JSON.parse(cartInStorage));
        dispatch({
          type: 'SET_INITIAL_BASKET',
          payload: JSON.parse(cartInStorage)
        });
      }
    }
  }, []);

  var renderLoader = function renderLoader() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_loader_spinner__WEBPACK_IMPORTED_MODULE_8___default.a, {
      type: "ThreeDots",
      color: "#FFFFFF",
      height: 29,
      width: 29,
      timeout: 30000 //3 secs
      ,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 32,
        columnNumber: 9
      }
    });
  };

  var checkIfInCart = function checkIfInCart(_id) {
    //  return  currentCart.filter(item => item._id === _id)
    return basket.products.filter(function (item) {
      return item._id === _id;
    });
  };

  var removeFromCart = function removeFromCart() {
    var itemsInCart = checkIfInCart(_id); // find index of item in basket array

    var newCartArray = basket.products;
    var itemIndex = newCartArray.findIndex(function (item) {
      return item._id === _id;
    });
    var item = newCartArray[itemIndex];

    if (itemsInCart[0].product_qty == 1) {
      var newArray = newCartArray.filter(function (el) {
        return el != item;
      });
      dispatch({
        type: 'REMOVE_FROM_BASKET',
        payload: item
      });
      localStorage.setItem('soap-cart', JSON.stringify(newArray));
    } else {
      item.product_qty--;
      item.total_price = parseFloat(item.product_price * item.product_qty);
      setCurrentCart(newCartArray);
      dispatch({
        type: 'ADD_TO_BASKET',
        payload: newCartArray
      });
      localStorage.setItem('soap-cart', JSON.stringify(newCartArray));
    }
  };

  var addToCart = function addToCart() {
    setLoading(true);
    setTimeout(function () {
      console.log(quantity);
      var adjustedPrice = parseFloat(product_price - product_price * product_discount / 100);
      var newProduct = {
        _id: _id,
        product_name: product_name,
        product_description: product_short_description,
        product_picture_1: product_picture_1.url,
        product_price: adjustedPrice,
        product_qty: quantity,
        total_price: adjustedPrice
      };

      if (currentCart.length === 0) {
        setCurrentCart([newProduct]);
        dispatch({
          type: 'ADD_TO_BASKET',
          payload: [newProduct]
        });
        localStorage.setItem('soap-cart', JSON.stringify([newProduct]));
      } else {
        var newCartArray = basket.products;
        var productInCart = checkIfInCart(_id);

        if (productInCart.length > 0) {
          var itemIndex = newCartArray.findIndex(function (item) {
            return item._id === _id;
          });
          var item = newCartArray[itemIndex];
          item.product_qty += quantity;
          item.total_price = parseFloat(item.product_price * item.product_qty);
          setCurrentCart(newCartArray);
          dispatch({
            type: 'ADD_TO_BASKET',
            payload: newCartArray
          });
          localStorage.setItem('soap-cart', JSON.stringify(newCartArray));
        } else {
          var _newCartArray = [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(currentCart), [newProduct]);

          localStorage.setItem('soap-cart', JSON.stringify(_newCartArray));
          setCurrentCart([].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(currentCart), [newProduct]));
          dispatch({
            type: 'ADD_TO_BASKET',
            payload: _newCartArray
          });
        }
      }

      setLoading(false);
      setAdded(true);
    }, 2000);
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, props["function"] === 'add' && !props.icon && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_ui_AnimatedButton__WEBPACK_IMPORTED_MODULE_7__["default"], {
    primary: true,
    med: true,
    fixed: true,
    withIcon: props.icon,
    style: {
      maxWidth: 200
    },
    handleClick: addToCart,
    text: !added ? 'Add to cart' : 'Add more',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 115,
      columnNumber: 9
    }
  }, loading && renderLoader(), !loading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_feather__WEBPACK_IMPORTED_MODULE_10__["ShoppingCart"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 122,
      columnNumber: 26
    }
  })), !props.icon && !props["function"] === 'add' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_ui_AnimatedButton__WEBPACK_IMPORTED_MODULE_7__["default"], {
    primary: true,
    med: true,
    fixed: true,
    withIcon: props.icon,
    style: {
      maxWidth: 200
    },
    handleClick: removeFromCart,
    text: 'Remove',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 126,
      columnNumber: 9
    }
  }, loading && renderLoader(), !loading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_feather__WEBPACK_IMPORTED_MODULE_10__["Trash2"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 133,
      columnNumber: 26
    }
  })), props.icon && props["function"] === 'add' ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(IconButton, {
    handleClick: true,
    onClick: function onClick() {
      return addToCart();
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 137,
      columnNumber: 11
    }
  }, props.children) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(IconButton, {
    onClick: function onClick() {
      return removeFromCart();
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 141,
      columnNumber: 11
    }
  }, props.children));
};

/* harmony default export */ __webpack_exports__["default"] = (AddToCart);
var IconButton = styled_components__WEBPACK_IMPORTED_MODULE_5___default.a.div(_templateObject());

/***/ }),

/***/ "./src/components/ui/AnimatedButton.js":
/*!*********************************************!*\
  !*** ./src/components/ui/AnimatedButton.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "@babel/runtime/helpers/extends");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_components_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../styles/components/button */ "./src/styles/components/button.js");
/* harmony import */ var react_feather__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-feather */ "react-feather");
/* harmony import */ var react_feather__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_feather__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_loader_spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-loader-spinner */ "react-loader-spinner");
/* harmony import */ var react_loader_spinner__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_loader_spinner__WEBPACK_IMPORTED_MODULE_4__);

var _jsxFileName = "/home/webnostix/Codebase/ChunkySoap2021/client/src/components/ui/AnimatedButton.js";





var AnimatedButton = function AnimatedButton(_ref) {
  var props = _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, _ref);

  var renderLoader = function renderLoader() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_loader_spinner__WEBPACK_IMPORTED_MODULE_4___default.a, {
      type: "ThreeDots",
      color: "#FFFFFF",
      height: 29,
      width: 29,
      timeout: 30000 //3 secs
      ,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 10,
        columnNumber: 9
      }
    });
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, props.withIcon ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    onClick: function onClick() {
      return props.handleClick();
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 9
    }
  }, props.children) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_styles_components_button__WEBPACK_IMPORTED_MODULE_2__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
    fixed: true
  }, props, {
    onClick: function onClick() {
      return props.handleClick();
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 9
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "button-content",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 11
    }
  }, props.styled && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 15
    }
  }, props.children), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 17
    }
  }, props.loading === true ? renderLoader() : props.text), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36,
      columnNumber: 17
    }
  }, props.children || /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_feather__WEBPACK_IMPORTED_MODULE_3__["Check"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 40
    }
  })))));
};

AnimatedButton.defaultProps = {
  handleClick: function handleClick() {},
  loading: 'false'
};
/* harmony default export */ __webpack_exports__["default"] = (AnimatedButton);

/***/ }),

/***/ "./src/components/ui/Category.js":
/*!***************************************!*\
  !*** ./src/components/ui/Category.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _styles_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../styles/ui */ "./src/styles/ui/index.js");
/* harmony import */ var _styles_typography__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../styles/typography */ "./src/styles/typography.js");
/* harmony import */ var _styles_variables__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../styles/variables */ "./src/styles/variables.js");

var _jsxFileName = "/home/webnostix/Codebase/ChunkySoap2021/client/src/components/ui/Category.js";

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n    width: 40px;\n    height: 40px;\n    border-radius: 50%;\n    background-color:", ";\n    margin-right: 20px;\n    ", "\n    ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}








var Category = function Category(_ref) {
  var name = _ref.name,
      id = _ref.id,
      image = _ref.image;
  var history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["useHistory"])();

  var navigate = function navigate(id) {
    history.push("/category/".concat(id));
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_styles_ui__WEBPACK_IMPORTED_MODULE_4__["CategoryFrame"], {
    onClick: function onClick() {
      return navigate(id);
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", {
    src: "http://localhost:1337".concat(image),
    style: {
      height: 250,
      transform: 'rotate(10deg) translateY(20px)'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18,
      columnNumber: 13
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    style: {
      transform: 'translateY(150px) rotate(10deg)',
      display: 'flex',
      alignItems: 'center'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Dot, {
    name: name,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20,
      columnNumber: 13
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_5__["Heading2"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 13
    }
  }, name))));
};

/* harmony default export */ __webpack_exports__["default"] = (Category);
var Dot = styled_components__WEBPACK_IMPORTED_MODULE_2___default.a.div(_templateObject(), _styles_variables__WEBPACK_IMPORTED_MODULE_6__["palette"].secondayColor, function (props) {
  return props.name === 'Soaps' && "\n        background-color: ".concat(_styles_variables__WEBPACK_IMPORTED_MODULE_6__["palette"].tertiaryColor, "\n    ");
}, function (props) {
  return props.name === 'Shampoo' && "\n        background-color: ".concat(_styles_variables__WEBPACK_IMPORTED_MODULE_6__["palette"].primaryColor, "\n    ");
});

/***/ }),

/***/ "./src/components/ui/DropDownMenu.js":
/*!*******************************************!*\
  !*** ./src/components/ui/DropDownMenu.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_ui_dropMenu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../styles/ui/dropMenu */ "./src/styles/ui/dropMenu.js");
/* harmony import */ var _PageLink__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PageLink */ "./src/components/ui/PageLink.js");
/* harmony import */ var _styles_typography__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../styles/typography */ "./src/styles/typography.js");
var _jsxFileName = "/home/webnostix/Codebase/ChunkySoap2021/client/src/components/ui/DropDownMenu.js";





var DropDownMenu = function DropDownMenu(props) {
  var closeMenu = props.closeMenu,
      menuData = props.menuData,
      title = props.title;
  console.log("MENU DATA ", props);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_styles_ui_dropMenu__WEBPACK_IMPORTED_MODULE_1__["CategoryMenu"], {
    onMouseLeave: closeMenu,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_styles_ui_dropMenu__WEBPACK_IMPORTED_MODULE_1__["Pointer"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12,
      columnNumber: 9
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_3__["Heading2"], {
    light: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 9
    }
  }, title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14,
      columnNumber: 9
    }
  }, menuData && menuData.map(function (el, i) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      key: i,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 17,
        columnNumber: 15
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_PageLink__WEBPACK_IMPORTED_MODULE_2__["default"], {
      color: "dark",
      to: "/category/".concat(el._id),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 18,
        columnNumber: 17
      }
    }, el.category_name));
  }))));
};

DropDownMenu.defaultProps = {
  closeMenu: function closeMenu() {},
  menuData: [],
  title: "menu"
};
/* harmony default export */ __webpack_exports__["default"] = (DropDownMenu);

/***/ }),

/***/ "./src/components/ui/PageLink.js":
/*!***************************************!*\
  !*** ./src/components/ui/PageLink.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ui_DropDownMenu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ui/DropDownMenu */ "./src/components/ui/DropDownMenu.js");
/* harmony import */ var _helpers_functions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../helpers/functions */ "./src/helpers/functions.js");
/* harmony import */ var _styles_variables__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../styles/variables */ "./src/styles/variables.js");

var _jsxFileName = "/home/webnostix/Codebase/ChunkySoap2021/client/src/components/ui/PageLink.js";
// import { useRouter } from 'next/router'







var PageLink = function PageLink(_ref) {
  var children = _ref.children,
      to = _ref.to,
      withMenu = _ref.withMenu,
      menuData = _ref.menuData,
      menuTitle = _ref.menuTitle,
      color = _ref.color,
      display = _ref.display;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState, 2),
      hovered = _useState2[0],
      setHovered = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false),
      _useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState3, 2),
      showMenu = _useState4[0],
      setShowMenu = _useState4[1];

  var history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["useHistory"])();
  var location = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["useLocation"])(); // console.log("ROUTING", "Location: ", location, "History: ", history)

  var style = {
    fontWeight: 600,
    marginRight: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: _helpers_functions__WEBPACK_IMPORTED_MODULE_4__["pathMatches"](location.pathname) === to && location.pathname !== '/basket' || hovered === true ? "".concat(_styles_variables__WEBPACK_IMPORTED_MODULE_5__["palette"].secondayColor) : 'black'
  };
  var altStyle = {
    color: location.pathname.includes(to) && location.pathname !== '/basket' || hovered === true ? "white" : 'black'
  };

  var handleMouseOver = function handleMouseOver() {
    setHovered(!hovered);

    if (withMenu) {
      setShowMenu(true);
    }
  };

  var handleClick = function handleClick(e) {
    e.preventDefault();
    !display && history.push(to);
  };

  var closeMenu = function closeMenu() {
    setShowMenu(false);
    console.log("COLSING");
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, color === 'dark' ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
    href: to,
    onClick: handleClick,
    onMouseOver: handleMouseOver,
    onMouseOut: handleMouseOver,
    style: (style, altStyle),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55,
      columnNumber: 7
    }
  }, children) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
    href: to,
    onClick: handleClick,
    onMouseOver: handleMouseOver,
    onMouseOut: handleMouseOver,
    style: style,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59,
      columnNumber: 7
    }
  }, children), withMenu && showMenu === true ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_ui_DropDownMenu__WEBPACK_IMPORTED_MODULE_3__["default"], {
    closeMenu: closeMenu,
    title: menuTitle,
    menuData: menuData,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64,
      columnNumber: 9
    }
  }) : null);
};

/* harmony default export */ __webpack_exports__["default"] = (PageLink);

/***/ }),

/***/ "./src/components/ui/ProductItem.js":
/*!******************************************!*\
  !*** ./src/components/ui/ProductItem.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _styles_ui_productFrame__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../styles/ui/productFrame */ "./src/styles/ui/productFrame.js");
/* harmony import */ var react_feather__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-feather */ "react-feather");
/* harmony import */ var react_feather__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_feather__WEBPACK_IMPORTED_MODULE_5__);


var _jsxFileName = "/home/webnostix/Codebase/ChunkySoap2021/client/src/components/ui/ProductItem.js";

function _templateObject2() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n        &, ::before{\n        position: relative;\n        padding: 15px 25px 15px 0px ;\n        border-radius: 50px;\n        max-width: 360px;\n        min-width: 360px;\n        height: 20px;\n        background-color: #F6F2F2;\n        display: flex;\n        ", "\n        ", "\n        justify-content: space-between;\n        }\n        &::before {\n            content: '';\n            background-color: #EFB4F9;\n            min-width: 130px;\n            transform: translateY(-14px);\n            ", "\n            position: absolute;\n            color: white;\n        }\n\n        "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n       &, ::after {\n        position: relative;\n        text-align: center;\n        padding: 15px 15px;\n        border-radius: 50px;\n        max-height: 20px;\n        max-width: 60px;\n        color: white;\n        background-color: #F9B233;\n        z-index: 10;\n        transform: translate(300px, -280px);\n       }\n "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

// import { useRouter } from 'next/router'



 // import { Router } from 'next/router'

var ProductItem = function ProductItem(props) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])({}),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState, 2),
      product = _useState2[0],
      setProduct = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(false),
      _useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState3, 2),
      hovered = _useState4[0],
      setHovered = _useState4[1];

  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    if (props.product) {
      console.log("PRODUCT ", props.product);
      setProduct(props.product);
    }
  }, [props]);
  var product_picture_1 = product.product_picture_1,
      product_featured = product.product_featured,
      product_name = product.product_name,
      product_discount = product.product_discount,
      product_price = product.product_price,
      _id = product._id,
      categories = product.categories;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: 25,
      marginTop: 25
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_styles_ui_productFrame__WEBPACK_IMPORTED_MODULE_4__["default"], {
    onClick: function onClick() {
      return props.clickEvent(_id);
    },
    onMouseOver: function onMouseOver() {
      return setHovered(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setHovered(false);
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("img", {
    // src={props.image ? `http://localhost:1337${props.image.url}` : '/noimage.png'} 
    src: product_picture_1 ? "".concat("http://localhost:1337").concat(product_picture_1.url) : '/noimage.png',
    alt: "product-image",
    style: {
      maxHeight: 250
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 17
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_feather__WEBPACK_IMPORTED_MODULE_5__["Eye"], {
    color: "white",
    size: 36,
    style: {
      position: 'fixed',
      bottom: 30,
      right: 40,
      visibility: hovered ? 'visible' : 'hidden',
      transition: 'all 0.5 ease-in'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 17
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Pill, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("h2", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 16
    }
  }, props.info)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("h2", {
    style: {
      marginLeft: 10,
      fontSize: 24,
      marginTop: -15,
      marginBottom: 10
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 13
    }
  }, product_name && product_name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Prices, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("h3", {
    style: {
      zIndex: 300,
      color: 'white',
      marginLeft: 15,
      fontSize: 20
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42,
      columnNumber: 17
    }
  }, categories && categories[0].category_name), product_discount > 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("h3", {
    style: {
      opacity: 0.3,
      marginLeft: 45,
      fontSize: 20,
      textDecoration: 'line-through'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43,
      columnNumber: 45
    }
  }, "\xA3  ", product_price.toFixed(2)) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("h3", {
    style: {
      fontSize: 20
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44,
      columnNumber: 17
    }
  }, "\xA3", product_price - (product_price * product_discount / 100).toFixed(2))));
};

/* harmony default export */ __webpack_exports__["default"] = (ProductItem);
var Pill = styled_components__WEBPACK_IMPORTED_MODULE_3___default.a.div(_templateObject());
var Prices = styled_components__WEBPACK_IMPORTED_MODULE_3___default.a.div(_templateObject2(), ''
/* margin-top: 10px; */
, ''
/* z-index: 200; */
, ''
/* z-index: 300; */
);

/***/ }),

/***/ "./src/components/ui/ProductSlider.js":
/*!********************************************!*\
  !*** ./src/components/ui/ProductSlider.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "@babel/runtime/helpers/extends");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "@babel/runtime/helpers/toConsumableArray");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "@babel/runtime/helpers/objectWithoutProperties");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _ProductItem__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ProductItem */ "./src/components/ui/ProductItem.js");
/* harmony import */ var _styles_layout__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../styles/layout */ "./src/styles/layout.js");





var _jsxFileName = "/home/webnostix/Codebase/ChunkySoap2021/client/src/components/ui/ProductSlider.js";

function _templateObject3() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n      background-color: black;\n    "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  border: none;\n  border-radius: 50%;\n  background-color: gray;\n  cursor: pointer;\n  width: 15px;\n  height: 15px;\n  margin: 8px;\n  ", "\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  display: flex;\n  height: 50px;\n  width: 100%;\n  flex-direction: row;\n  justify-content: center;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}






var ProductSlider = function ProductSlider(_ref) {
  var data = _ref.data,
      handleClick = _ref.handleClick,
      perPage = _ref.perPage,
      rest = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_4___default()(_ref, ["data", "handleClick", "perPage"]);

  // TODO: Add dots with data array slice
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])([]),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3___default()(_useState, 2),
      sliceArray = _useState2[0],
      setSliceArray = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(1),
      _useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3___default()(_useState3, 2),
      currentPage = _useState4[0],
      setCurrentPage = _useState4[1];

  var productsPerPage = perPage;
  Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () {
    if (data && data.length > 0) {
      var slices = data.length / productsPerPage;
      setSliceArray(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2___default()(Array(slices)));
    }
  }, [data]);

  var selectPage = function selectPage(e) {
    setCurrentPage(e.target.value);
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_5___default.a.Fragment, null, data && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_8__["SlideGrid"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, rest, {
    mb: '100px',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 7
    }
  }), data.length > 1 ? data.slice(currentPage === 1 ? 0 : currentPage * productsPerPage, productsPerPage).map(function (product, i) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_ProductItem__WEBPACK_IMPORTED_MODULE_7__["default"], {
      product: product,
      info: "New",
      key: i,
      clickEvent: handleClick,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 35,
        columnNumber: 15
      }
    });
  }) : [data].map(function (product, i) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_ProductItem__WEBPACK_IMPORTED_MODULE_7__["default"], {
      product: product,
      info: "New",
      key: i,
      clickEvent: handleClick,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 43,
        columnNumber: 15
      }
    });
  })), data && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(Dots, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54,
      columnNumber: 7
    }
  }, data.length > 3 && sliceArray.map(function (el, i) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(Dot, {
      page: currentPage,
      value: i + 1,
      key: i,
      onClick: function onClick(e) {
        return selectPage(e);
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 57,
        columnNumber: 13
      }
    });
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (ProductSlider);
var Dots = styled_components__WEBPACK_IMPORTED_MODULE_6___default.a.div(_templateObject());
var Dot = styled_components__WEBPACK_IMPORTED_MODULE_6___default.a.button(_templateObject2(), function (props) {
  return props.page === props.value && Object(styled_components__WEBPACK_IMPORTED_MODULE_6__["css"])(_templateObject3());
});

/***/ }),

/***/ "./src/components/ui/ShippingOption.js":
/*!*********************************************!*\
  !*** ./src/components/ui/ShippingOption.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "@babel/runtime/helpers/objectWithoutProperties");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _styles_typography__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../styles/typography */ "./src/styles/typography.js");


var _jsxFileName = "/home/webnostix/Codebase/ChunkySoap2021/client/src/components/ui/ShippingOption.js";

function _templateObject4() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    align-items: center;\n    transform: translateY(-20px);\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n        border: 3px #79CBB7 solid;\n    "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n    width: 550px;\n    height: 80px;\n    padding: 20px 40px;\n    border: 3px #F7F2F2 solid;\n    border-radius: 10px;\n    margin: 20px 0px 0px 0px;\n    cursor: pointer;\n    ", "\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n     opacity: 0;\n     position: fixed;\n     width: 0;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}





var ShippingOption = function ShippingOption(_ref) {
  var option = _ref.option,
      checked = _ref.checked,
      selected = _ref.selected,
      rest = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default()(_ref, ["option", "checked", "selected"]);

  var handleSelection = function handleSelection(_id) {
    console.log("touched", _id);
    checked(_id);
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Label, {
    htmlFor: option.id,
    selected: selected === option.id,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12,
      columnNumber: 8
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Option, {
    type: "radio",
    name: "delivery",
    id: option.id,
    value: option.id,
    onChange: function onChange() {
      return handleSelection(option.id);
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 8
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(CarrierOption, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20,
      columnNumber: 8
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("img", {
    src: "http://localhost:1337".concat(option.shipping_image.formats.thumbnail.url),
    style: {
      maxHeight: 60,
      maxWidth: 120,
      marginRight: 20
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 13
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_4__["Paragraph"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 13
    }
  }, option.shipping_carrier, " - ", option.shipping_description, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 74
    }
  }), "Price:  \xA3 ", option.shipping_cost.toFixed(2))));
};

/* harmony default export */ __webpack_exports__["default"] = (ShippingOption);
var Option = styled_components__WEBPACK_IMPORTED_MODULE_3___default.a.input(_templateObject());
var Label = styled_components__WEBPACK_IMPORTED_MODULE_3___default.a.label(_templateObject2(), function (props) {
  return props.selected && Object(styled_components__WEBPACK_IMPORTED_MODULE_3__["css"])(_templateObject3());
});
var CarrierOption = styled_components__WEBPACK_IMPORTED_MODULE_3___default.a.div(_templateObject4());

/***/ }),

/***/ "./src/components/ui/SimpleTextInput.js":
/*!**********************************************!*\
  !*** ./src/components/ui/SimpleTextInput.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "@babel/runtime/helpers/extends");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "@babel/runtime/helpers/objectWithoutProperties");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _styles_typography__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../styles/typography */ "./src/styles/typography.js");
/* harmony import */ var _styles_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../styles/ui */ "./src/styles/ui/index.js");
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../ui */ "./src/components/ui/index.js");
/* harmony import */ var react_loader_spinner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-loader-spinner */ "react-loader-spinner");
/* harmony import */ var react_loader_spinner__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_loader_spinner__WEBPACK_IMPORTED_MODULE_6__);


var _jsxFileName = "/home/webnostix/Codebase/ChunkySoap2021/client/src/components/ui/SimpleTextInput.js";




 // import WxButton from "../styles/components/button";

var SimpleTextInput = function SimpleTextInput(_ref, ref) {
  var withBigButton = _ref.withBigButton,
      submitHandler = _ref.submitHandler,
      handleChange = _ref.handleChange,
      label = _ref.label,
      withButton = _ref.withButton,
      buttonText = _ref.buttonText,
      cols = _ref.cols,
      direction = _ref.direction,
      value = _ref.value,
      valid = _ref.valid,
      loading = _ref.loading,
      rest = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default()(_ref, ["withBigButton", "submitHandler", "handleChange", "label", "withButton", "buttonText", "cols", "direction", "value", "valid", "loading"]);

  console.log("REF ", ref);

  var renderLoader = function renderLoader() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_loader_spinner__WEBPACK_IMPORTED_MODULE_6___default.a, {
      type: "ThreeDots",
      color: "#FFFFFF",
      height: 49,
      width: 29,
      timeout: 30000 //3 secs
      ,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 12,
        columnNumber: 9
      }
    });
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, withButton && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_3__["Paragraph"], {
    big: true,
    style: {
      marginLeft: 10
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 13
    }
  }, label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'row'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_styles_ui__WEBPACK_IMPORTED_MODULE_4__["TextInput"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
    value: value,
    ref: ref,
    inline: true
  }, rest, {
    valid: valid,
    withButton: withButton,
    onChange: function onChange(e) {
      return handleChange(e);
    },
    onFocus: function onFocus() {
      return console.log("focussed");
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 17
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_ui__WEBPACK_IMPORTED_MODULE_5__["AnimatedButton"], {
    primary: true,
    big: true,
    text: buttonText,
    handleClick: submitHandler,
    style: {
      width: 100,
      display: 'inline-block',
      transform: 'translateX(-60px)'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 18
    }
  }))), withBigButton && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_3__["Paragraph"], {
    big: true,
    style: {
      marginRight: 10,
      textAlign: 'center'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 13
    }
  }, label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("form", {
    onSubmit: function onSubmit(e) {
      e.preventDefault();
      submitHandler();
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'row'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_styles_ui__WEBPACK_IMPORTED_MODULE_4__["TextInput"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
    value: value,
    ref: ref,
    inline: true
  }, rest, {
    valid: valid,
    value: value,
    withButton: withButton,
    onChange: function onChange(e) {
      return handleChange(e);
    },
    onFocus: function onFocus() {
      return console.log("focussed");
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 25
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_ui__WEBPACK_IMPORTED_MODULE_5__["AnimatedButton"], {
    primary: true,
    big: true,
    xl: true,
    styled: true,
    type: "submit",
    style: {
      width: 100,
      display: 'inline-block',
      transform: 'translateX(-60px)'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48,
      columnNumber: 25
    }
  }, loading === false ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "script-font",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50,
      columnNumber: 30
    }
  }, " ", buttonText) : renderLoader())))), !withButton && !withBigButton && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      width: cols
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_3__["Paragraph"], {
    style: {
      marginLeft: 10
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62,
      columnNumber: 17
    }
  }, label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_styles_ui__WEBPACK_IMPORTED_MODULE_4__["TextInput"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
    value: value,
    ref: ref
  }, rest, {
    withButton: withButton,
    onChange: function onChange(e) {
      return handleChange(e);
    },
    onFocus: function onFocus() {
      return console.log("focussed");
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 65,
      columnNumber: 17
    }
  }))));
};

SimpleTextInput.defaultProps = {
  withButton: false,
  withBigButton: false,
  value: '',
  loading: false
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_2__["forwardRef"])(SimpleTextInput));

/***/ }),

/***/ "./src/components/ui/WxStep.js":
/*!*************************************!*\
  !*** ./src/components/ui/WxStep.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "@babel/runtime/helpers/extends");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_ui___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../styles/ui/ */ "./src/styles/ui/index.js");
/* harmony import */ var _styles_typography__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../styles/typography */ "./src/styles/typography.js");

var _jsxFileName = "/home/webnostix/Codebase/ChunkySoap2021/client/src/components/ui/WxStep.js";




var WxStep = function WxStep(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_styles_ui___WEBPACK_IMPORTED_MODULE_2__["Step"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8,
      columnNumber: 13
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    style: {
      display: 'inline-block',
      transform: 'translate(-200px, 50px)',
      position: 'absolute',
      marginTop: 10
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_3__["Paragraph"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10,
      columnNumber: 13
    }
  }, props.label)));
};

/* harmony default export */ __webpack_exports__["default"] = (WxStep);

/***/ }),

/***/ "./src/components/ui/index.js":
/*!************************************!*\
  !*** ./src/components/ui/index.js ***!
  \************************************/
/*! exports provided: AddToCart, AnimatedButton, PageLink, ProductSlider, ProductItem, DropDownMenu, WxStep, SimpleTextInput, ShippingOption, Category */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AddToCartBtn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AddToCartBtn */ "./src/components/ui/AddToCartBtn.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AddToCart", function() { return _AddToCartBtn__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _AnimatedButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AnimatedButton */ "./src/components/ui/AnimatedButton.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AnimatedButton", function() { return _AnimatedButton__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _PageLink__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PageLink */ "./src/components/ui/PageLink.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PageLink", function() { return _PageLink__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _ProductSlider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ProductSlider */ "./src/components/ui/ProductSlider.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ProductSlider", function() { return _ProductSlider__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _ProductItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ProductItem */ "./src/components/ui/ProductItem.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ProductItem", function() { return _ProductItem__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _DropDownMenu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DropDownMenu */ "./src/components/ui/DropDownMenu.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DropDownMenu", function() { return _DropDownMenu__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _WxStep__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./WxStep */ "./src/components/ui/WxStep.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WxStep", function() { return _WxStep__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _SimpleTextInput__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./SimpleTextInput */ "./src/components/ui/SimpleTextInput.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SimpleTextInput", function() { return _SimpleTextInput__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _ShippingOption__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ShippingOption */ "./src/components/ui/ShippingOption.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ShippingOption", function() { return _ShippingOption__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _Category__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Category */ "./src/components/ui/Category.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Category", function() { return _Category__WEBPACK_IMPORTED_MODULE_9__["default"]; });



 // export { default as ProductGrid } from './ProductGrid'









/***/ }),

/***/ "./src/containers/AdminPage.js":
/*!*************************************!*\
  !*** ./src/containers/AdminPage.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "@babel/runtime/helpers/defineProperty");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _styles_layout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../styles/layout */ "./src/styles/layout.js");
/* harmony import */ var _components_admin__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/admin */ "./src/components/admin/index.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../helpers */ "./src/helpers/index.js");
/* harmony import */ var _helpers_functions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../helpers/functions */ "./src/helpers/functions.js");
/* harmony import */ var _styles_components_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../styles/components/button */ "./src/styles/components/button.js");




var _jsxFileName = "/home/webnostix/Codebase/ChunkySoap2021/client/src/containers/AdminPage.js";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }









var AdminPage = function AdminPage() {
  var orders = Object(react_redux__WEBPACK_IMPORTED_MODULE_5__["useSelector"])(function (state) {
    return state.orders.orders;
  });
  var initialState = {
    numberPerPage: 6,
    pageCount: 1,
    currentData: []
  };

  var paginationReducer = function paginationReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 ? arguments[1] : undefined;
    console.log("PAGE REDUCER ", action.payload);

    switch (action.type) {
      case 'GET_DATA':
        return _objectSpread(_objectSpread({}, state), {}, {
          currentData: action.payload
        });

      case 'PREV_PAGE':
        return _objectSpread(_objectSpread({}, state), {}, {
          pageCount: state.pageCount - 1
        });

      case 'NEXT_PAGE':
        return _objectSpread(_objectSpread({}, state), {}, {
          pageCount: state.pageCount + 1
        });

      case 'SET_PAGE':
        return _objectSpread(_objectSpread({}, state), {}, {
          pageCount: action.payload
        });

      default:
        return state;
    }
  };

  var _useReducer = Object(react__WEBPACK_IMPORTED_MODULE_4__["useReducer"])(paginationReducer, initialState),
      _useReducer2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_useReducer, 2),
      paginationState = _useReducer2[0],
      paginationDispatch = _useReducer2[1];

  var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_5__["useDispatch"])();
  Object(react__WEBPACK_IMPORTED_MODULE_4__["useEffect"])(function () {
    callApi();
  }, []);
  Object(react__WEBPACK_IMPORTED_MODULE_4__["useEffect"])(function () {
    if (orders.length > 0) {
      var paginatedOrders = orders.slice((paginationState.pageCount - 1) * paginationState.numberPerPage, paginationState.pageCount * paginationState.numberPerPage);
      console.log("Mounted paginated ", paginatedOrders);
      paginationDispatch({
        type: 'GET_DATA',
        payload: paginatedOrders
      });
      console.log("MOUNTED state ", paginationState);
    }

    console.log("Mounted: ", orders, paginationState);
  }, [orders, paginationState.pageCount]);

  var renderOrderList = function renderOrderList(data) {
    return data.length > 0 && data.sort(function (a, b) {
      return a.createdAt - b.createdAt;
    }).map(function (order, i) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_components_admin__WEBPACK_IMPORTED_MODULE_7__["OrderListItem"], {
        order: order,
        key: i,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 68,
          columnNumber: 13
        }
      });
    });
  };

  var renderButtons = function renderButtons(data) {
    var pageCount = paginationState.pageCount;
    var numberOfPages = Math.round(data.length / paginationState.numberPerPage) + 1;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_4___default.a.Fragment, null, paginationState.pageCount > 1 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_styles_components_button__WEBPACK_IMPORTED_MODULE_10__["default"], {
      secondary: true,
      onClick: function onClick() {
        return paginationDispatch({
          type: 'PREV_PAGE'
        });
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 77,
        columnNumber: 47
      }
    }, "PREV"), numberOfPages > 0 && new Array(numberOfPages).fill().map(function (a, index) {
      return pageCount === index + 1 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_styles_components_button__WEBPACK_IMPORTED_MODULE_10__["default"], {
        primary: true,
        sml: true,
        onClick: function onClick() {
          paginationDispatch({
            type: 'SET_PAGE',
            payload: index + 1
          });
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 79,
          columnNumber: 41
        }
      }, index + 1) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_styles_components_button__WEBPACK_IMPORTED_MODULE_10__["default"], {
        sml: true,
        onClick: function onClick() {
          paginationDispatch({
            type: 'SET_PAGE',
            payload: index + 1
          });
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 80,
          columnNumber: 18
        }
      }, index + 1);
    }), paginationState.pageCount < numberOfPages && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_styles_components_button__WEBPACK_IMPORTED_MODULE_10__["default"], {
      secondary: "true",
      onClick: function onClick() {
        return paginationDispatch({
          type: 'NEXT_PAGE'
        });
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 82,
        columnNumber: 59
      }
    }, "NEXT"));
  };

  var callApi = /*#__PURE__*/function () {
    var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
      var orders;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _helpers__WEBPACK_IMPORTED_MODULE_8__["myApi"].send('/orders', 'GET', undefined, 'public');

            case 2:
              orders = _context.sent;
              dispatch({
                type: 'GET_ORDERS',
                payload: orders
              });

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function callApi() {
      return _ref.apply(this, arguments);
    };
  }();

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_6__["Section"], {
    light: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 92,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("h1", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 93,
      columnNumber: 13
    }
  }, "Orders"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-around',
      alignContent: 'right',
      marginBottom: 20
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 94,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 95,
      columnNumber: 17
    }
  }, "Date"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 98,
      columnNumber: 17
    }
  }, "Amount"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 99,
      columnNumber: 17
    }
  }, "Customer"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 100,
      columnNumber: 17
    }
  }, "Shipping"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 101,
      columnNumber: 17
    }
  })), paginationState.currentData.length > 0 && renderOrderList(paginationState.currentData), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
    style: {
      display: 'flex'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 106,
      columnNumber: 13
    }
  }, orders.length > 0 && renderButtons(orders)));
};

/* harmony default export */ __webpack_exports__["default"] = (AdminPage);

/***/ }),

/***/ "./src/containers/AuthPage.js":
/*!************************************!*\
  !*** ./src/containers/AuthPage.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "@babel/runtime/helpers/defineProperty");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router */ "react-router");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_router__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _styles_layout__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../styles/layout */ "./src/styles/layout.js");
/* harmony import */ var _styles_typography__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../styles/typography */ "./src/styles/typography.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components */ "./src/components/index.js");
/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../hooks */ "./src/hooks/index.js");




var _jsxFileName = "/home/webnostix/Codebase/ChunkySoap2021/client/src/containers/AuthPage.js";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }






 // import  useStrapiLogin  from '../hooks/useStrapiLogin'



var AuthPage = function AuthPage(props) {
  var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_5__["useDispatch"])();
  var history = Object(react_router__WEBPACK_IMPORTED_MODULE_6__["useHistory"])();
  Object(react__WEBPACK_IMPORTED_MODULE_4__["useEffect"])(function () {
    var query = new URLSearchParams(props.location.search);
    var isRegistration = query.get('register'); // || false

    loginDispatch({
      type: 'UPDATE_FIELD',
      fieldName: 'register',
      fieldValue: isRegistration
    });
  }, [props.location.search]);

  var loginReducer = function loginReducer(state, action) {
    switch (action.type) {
      case 'UPDATE_FIELD':
        return _objectSpread(_objectSpread({}, state), {}, {
          fields: _objectSpread(_objectSpread({}, state.fields), {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()({}, action.fieldName, action.fieldValue))
        });

      case 'LOGGING_IN':
        return _objectSpread(_objectSpread({}, state), {}, {
          loading: true
        });

      case 'LOGGED_IN':
        return _objectSpread(_objectSpread({}, state), {}, {
          loading: false
        });

      default:
        return state;
    }
  };

  var initialState = {
    loading: false,
    errorMsg: '',
    authenticated: false,
    fields: {
      register: register,
      identifier: '',
      password: '',
      password_confirmation: '',
      username: ''
    }
  };

  var _useReducer = Object(react__WEBPACK_IMPORTED_MODULE_4__["useReducer"])(loginReducer, initialState),
      _useReducer2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_useReducer, 2),
      loginState = _useReducer2[0],
      loginDispatch = _useReducer2[1];

  var authenticated = loginState.authenticated,
      guest = loginState.guest,
      loading = loginState.loading,
      _loginState$fields = loginState.fields,
      email = _loginState$fields.email,
      password = _loginState$fields.password,
      register = _loginState$fields.register,
      username = _loginState$fields.username,
      password_confirmation = _loginState$fields.password_confirmation;

  var _useStrapiLogin = Object(_hooks__WEBPACK_IMPORTED_MODULE_10__["useStrapiLogin"])({
    dispatch: dispatch,
    loginState: loginState
  }),
      handleStrapiLogin = _useStrapiLogin.handleStrapiLogin,
      errorMsg = _useStrapiLogin.errorMsg,
      isLoggedIn = _useStrapiLogin.isLoggedIn;

  var handleChange = function handleChange(e) {
    var _e$target = e.target,
        name = _e$target.name,
        value = _e$target.value,
        type = _e$target.type,
        checked = _e$target.checked;

    if (type === 'checkbox') {
      loginDispatch({
        type: 'UPDATE_FIELD',
        fieldName: name,
        fieldValue: checked
      });
      return;
    }

    loginDispatch({
      type: 'UPDATE_FIELD',
      fieldName: name,
      fieldValue: value
    });
    console.log("LOGIN STATE ", loginState.fields.email);
  };

  var handleLogin = /*#__PURE__*/function () {
    var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(e) {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              e.preventDefault();
              loginDispatch({
                type: 'LOGGING_IN'
              });
              _context.next = 4;
              return handleStrapiLogin(loginState.fields, dispatch);

            case 4:
              loginDispatch({
                type: 'LOGGED_IN'
              });
              history.push('/basket');

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function handleLogin(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_4___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_7__["Container"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 86,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_9__["LoginForm"], {
    type: "standalone",
    data: loginState.fields,
    handleChange: handleChange,
    handleLogin: handleLogin,
    loading: loading ? 1 : undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 87,
      columnNumber: 13
    }
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (AuthPage);

/***/ }),

/***/ "./src/containers/CategoriesPage.js":
/*!******************************************!*\
  !*** ./src/containers/CategoriesPage.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/layout */ "./src/components/layout/index.js");
/* harmony import */ var _components_ui__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/ui */ "./src/components/ui/index.js");
/* harmony import */ var _styles_layout__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../styles/layout */ "./src/styles/layout.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components */ "./src/components/index.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../helpers */ "./src/helpers/index.js");
/* harmony import */ var _hooks_useModal__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../hooks/useModal */ "./src/hooks/useModal.js");



var _jsxFileName = "/home/webnostix/Codebase/ChunkySoap2021/client/src/containers/CategoriesPage.js";










var CategoriesPage = function CategoriesPage(props) {
  var _id = props.match.params._id;
  var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["useDispatch"])();
  var history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_5__["useHistory"])();
  var products = Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["useSelector"])(function (state) {
    return state.products;
  });

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])([]),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_useState, 2),
      filteredProducts = _useState2[0],
      setFilteredProducts = _useState2[1];

  var _useModal = Object(_hooks_useModal__WEBPACK_IMPORTED_MODULE_11__["default"])({
    products: products
  }),
      isShowing = _useModal.isShowing,
      toggle = _useModal.toggle,
      handleClick = _useModal.handleClick,
      selectedProduct = _useModal.selectedProduct;

  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _apiCall();

            case 2:
              filterProductsById();

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();

    console.log("GAT PAGE PRODS ", products);
  }, [products, _id]);

  var viewProduct = function viewProduct(id) {
    history.push("/product/".concat(id));
  };

  var _apiCall = /*#__PURE__*/function () {
    var _ref2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
      var data;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(products.products.length > 1)) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return");

            case 2:
              _context2.next = 4;
              return _helpers__WEBPACK_IMPORTED_MODULE_10__["myApi"].send("/products", 'GET', undefined, 'public');

            case 4:
              data = _context2.sent;
              dispatch({
                type: "FETCH_PRODUCTS",
                payload: data
              });

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function _apiCall() {
      return _ref2.apply(this, arguments);
    };
  }();

  var filterProductsById = function filterProductsById() {
    var filtered = products.products.find(function (product) {
      return product.categories[0]._id === _id;
    });
    setFilteredProducts(filtered);
    console.log("FILTERED ", filtered, _id);
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_8__["Container"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53,
      columnNumber: 7
    }
  }, filteredProducts && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_components_ui__WEBPACK_IMPORTED_MODULE_7__["ProductSlider"], {
    perPage: 3,
    data: filteredProducts,
    handleClick: handleClick,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56,
      columnNumber: 11
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_9__["Footer"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59,
      columnNumber: 7
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_9__["Modal"], {
    isShowing: isShowing,
    hide: toggle,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_9__["ProductPreview"], {
    product: selectedProduct,
    viewProduct: viewProduct,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61,
      columnNumber: 9
    }
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (Object(_components_layout__WEBPACK_IMPORTED_MODULE_6__["withHero"])({
  component: CategoriesPage
}));

/***/ }),

/***/ "./src/containers/CheckoutPage.js":
/*!****************************************!*\
  !*** ./src/containers/CheckoutPage.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _styles_layout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../styles/layout */ "./src/styles/layout.js");
/* harmony import */ var _components_ui__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/ui */ "./src/components/ui/index.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components */ "./src/components/index.js");
/* harmony import */ var _styles_ui__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../styles/ui */ "./src/styles/ui/index.js");
/* harmony import */ var _styles_typography__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../styles/typography */ "./src/styles/typography.js");
/* harmony import */ var _styles_ui_basket__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../styles/ui/basket */ "./src/styles/ui/basket.js");
/* harmony import */ var _styles_variables__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../styles/variables */ "./src/styles/variables.js");
/* harmony import */ var _helpers_functions__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../helpers/functions */ "./src/helpers/functions.js");


var _jsxFileName = "/home/webnostix/Codebase/ChunkySoap2021/client/src/containers/CheckoutPage.js";

function _templateObject4() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  position: absolute;\n   min-width: 750px;\n   margin-top: 10px;\n   ", "\n   left: 12%;\n   text-align: center;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n    flex: 1.3;\n    ", "\n    min-width: 450px;\n    min-height: 800px;\n    margin-top: 40px;\n    padding: 20px 10px;\n       &::-webkit-scrollbar {\n        display: none;\n        }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n    width: 50%;\n    min-width: 700px;\n    flex: 2;\n    padding: 0px;\n    margin: 0px 10px 20px 10px;   \n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n    display: flex;\n    flex-wrap: wrap;\n    max-width: 1394px;\n    margin: 50px auto;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}













var CheckoutPage = function CheckoutPage() {
  // do logged in check
  var _useSelector = Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["useSelector"])(function (state) {
    return state.basket;
  }),
      basket = _useSelector.basket;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(0),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState, 2),
      total = _useState2[0],
      setTotal = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(0.00),
      _useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState3, 2),
      postage = _useState4[0],
      setPostage = _useState4[1];

  var initialState = {
    step: 1
  };

  var _useReducer = Object(react__WEBPACK_IMPORTED_MODULE_2__["useReducer"])(_components__WEBPACK_IMPORTED_MODULE_7__["checkoutReducer"], initialState),
      _useReducer2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useReducer, 2),
      cartState = _useReducer2[0],
      cartDispatch = _useReducer2[1];

  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    if (_helpers_functions__WEBPACK_IMPORTED_MODULE_12__["getCartTotal"](basket.products) < 25 || basket.postage > 4) {
      console.log("BASKET POSTAGE ", basket.postage);
      setPostage(basket.postage || 0.00);
    } else {
      setPostage(0);
    }

    setTotal(_helpers_functions__WEBPACK_IMPORTED_MODULE_12__["getCartTotal"](basket.products, postage));
  }, [basket]);
  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    setTotal(_helpers_functions__WEBPACK_IMPORTED_MODULE_12__["getCartTotal"](basket.products, postage));
  }, [postage]); // const handleChange = (e) => {
  //     console.log("EVENT ", e.target.value, e.target.name)
  // }

  var steps = [{
    no: 1,
    label: 'Account'
  }, {
    no: 2,
    label: 'Shipping'
  }, {
    no: 3,
    label: 'Payment'
  }, {
    no: 4,
    label: 'Success'
  }];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("img", {
    src: "/drips-dark.svg",
    style: {
      position: 'absolute',
      right: 0,
      top: 0,
      width: 500,
      zIndex: 0
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51,
      columnNumber: 13
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_5__["Section"], {
    light: true,
    height: 1500,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_5__["Container"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_9__["Heading1"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54,
      columnNumber: 21
    }
  }, "Checkout"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(CheckoutWrapper, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(CheckoutActions, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_7__["CheckoutSteps"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 25
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(BasketSection, {
    style: {
      borderLeft: '1px solid #D8D8D8'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_styles_ui_basket__WEBPACK_IMPORTED_MODULE_10__["BasketWrapper"], {
    style: {
      transform: 'translateY(-120px)'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_styles_ui_basket__WEBPACK_IMPORTED_MODULE_10__["ProductRow"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_9__["Heading2"], {
    style: {
      flex: 3
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62,
      columnNumber: 21
    }
  }, "Your Basket")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    style: {
      maxHeight: 700
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64,
      columnNumber: 17
    }
  }, basket.products.length > 0 ? basket.products.map(function (el) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_styles_ui_basket__WEBPACK_IMPORTED_MODULE_10__["ProductRow"], {
      key: el._id,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 68,
        columnNumber: 25
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_9__["Paragraph"], {
      style: {
        flex: 1
      },
      big: true,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 69,
        columnNumber: 25
      }
    }, el.product_qty, " x"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_styles_ui__WEBPACK_IMPORTED_MODULE_8__["ProductFrame"], {
      sml: true,
      style: {
        flex: 1,
        marginRight: 20
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 72,
        columnNumber: 29
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("img", {
      src: "".concat("http://localhost:1337").concat(el.product_picture_1),
      style: {
        display: 'block',
        maxHeight: '70px',
        maxWidth: '70px',
        width: 'auto',
        height: 'auto'
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 73,
        columnNumber: 33
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      style: {
        flex: 3,
        paddingRight: 20
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 80,
        columnNumber: 29
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_9__["Paragraph"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 81,
        columnNumber: 29
      }
    }, el.product_name)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      style: {
        flex: 1,
        marginRight: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 85,
        columnNumber: 29
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_9__["Paragraph"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 86,
        columnNumber: 33
      }
    }, "\xA3", el.total_price.toFixed(2))));
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_9__["Heading2"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 92,
      columnNumber: 26
    }
  }, "You Dont Have any Items in you basket yet")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_styles_ui_basket__WEBPACK_IMPORTED_MODULE_10__["ProductRow"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 95,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_styles_ui_basket__WEBPACK_IMPORTED_MODULE_10__["Divider"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 96,
      columnNumber: 25
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_styles_ui_basket__WEBPACK_IMPORTED_MODULE_10__["ProductRow"], {
    narrow: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 98,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_components_ui__WEBPACK_IMPORTED_MODULE_6__["SimpleTextInput"], {
    withButton: true,
    buttonText: "Apply",
    label: "Redeem Coupon / Discount Code",
    type: "text",
    placeholder: "COUPON CODE",
    handleChange: function handleChange() {},
    __source: {
      fileName: _jsxFileName,
      lineNumber: 99,
      columnNumber: 29
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_styles_ui_basket__WEBPACK_IMPORTED_MODULE_10__["ProductRow"], {
    narrow: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 101,
      columnNumber: 21
    }
  }, "Subtotal. \xA3 ", _helpers_functions__WEBPACK_IMPORTED_MODULE_12__["getCartTotal"](basket.products).toFixed(2)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_styles_ui_basket__WEBPACK_IMPORTED_MODULE_10__["ProductRow"], {
    narrow: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 104,
      columnNumber: 21
    }
  }, "Postage. \xA3", postage.toFixed(2)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_styles_ui_basket__WEBPACK_IMPORTED_MODULE_10__["ProductRow"], {
    narrow: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 107,
      columnNumber: 21
    }
  }, "Sales Tax. \xA3 ", 0.00.toFixed(2)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_styles_ui_basket__WEBPACK_IMPORTED_MODULE_10__["ProductRow"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 110,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_9__["Heading1"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 111,
      columnNumber: 25
    }
  }, "Total. \xA3", total.toFixed(2)))))))));
};

/* harmony default export */ __webpack_exports__["default"] = (CheckoutPage);
var CheckoutWrapper = styled_components__WEBPACK_IMPORTED_MODULE_4___default.a.div(_templateObject());
var CheckoutActions = styled_components__WEBPACK_IMPORTED_MODULE_4___default.a.div(_templateObject2());
var BasketSection = styled_components__WEBPACK_IMPORTED_MODULE_4___default.a.div(_templateObject3(), ''
/* border: 1px solid gray; */
);
var Steps = styled_components__WEBPACK_IMPORTED_MODULE_4___default.a.div(_templateObject4(), ''
/* right: 40%; */
);

/***/ }),

/***/ "./src/containers/HomePage.js":
/*!************************************!*\
  !*** ./src/containers/HomePage.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HomePage; });
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "@babel/runtime/helpers/defineProperty");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "@babel/runtime/helpers/extends");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../helpers */ "./src/helpers/index.js");
/* harmony import */ var _styles_layout__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../styles/layout */ "./src/styles/layout.js");
/* harmony import */ var _styles_typography__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../styles/typography */ "./src/styles/typography.js");
/* harmony import */ var _styles_ui__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../styles/ui */ "./src/styles/ui/index.js");
/* harmony import */ var _components_ui_ProductSlider__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../components/ui/ProductSlider */ "./src/components/ui/ProductSlider.js");
/* harmony import */ var _styles_components_button__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../styles/components/button */ "./src/styles/components/button.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../components */ "./src/components/index.js");
/* harmony import */ var _hooks_useModal__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../hooks/useModal */ "./src/hooks/useModal.js");
/* harmony import */ var _styles_variables__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../styles/variables */ "./src/styles/variables.js");
/* harmony import */ var _helpers_functions__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../helpers/functions */ "./src/helpers/functions.js");






var _jsxFileName = "/home/webnostix/Codebase/ChunkySoap2021/client/src/containers/HomePage.js";

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  overflow: hidden;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }















function HomePage(props) {
  var featured, popular;
  var products = Object(react_redux__WEBPACK_IMPORTED_MODULE_7__["useSelector"])(function (state) {
    return state.products;
  });
  console.log('PRODUCTS ', products);

  if (products.products) {
    featured = products.products.filter(function (el) {
      return el.product_featured === true;
    });
    popular = products === null || products === void 0 ? void 0 : products.products.sort(function (a, b) {
      return a.product_sold_quantity > b.product_sold_quantity ? 1 : -1;
    });
  }

  var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_7__["useDispatch"])();
  var history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_8__["useHistory"])();

  var _useModal = Object(_hooks_useModal__WEBPACK_IMPORTED_MODULE_17__["default"])({
    selectedProduct: selectedProduct,
    products: products
  }),
      isShowing = _useModal.isShowing,
      toggle = _useModal.toggle;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_6__["useState"])({}),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_5___default()(_useState, 2),
      selectedProduct = _useState2[0],
      setSelectedProduct = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_6__["useState"])([]),
      _useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_5___default()(_useState3, 2),
      currentCart = _useState4[0],
      setCurrentCart = _useState4[1];

  var envVar = "sk_test_rvboOk0S3wSR1tPGYuzzcjpV"; // Optin State - later add to custom optin hook

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_6__["useState"])({
    'email': ''
  }),
      _useState6 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_5___default()(_useState5, 2),
      optinMail = _useState6[0],
      setOptinMail = _useState6[1];

  Object(react__WEBPACK_IMPORTED_MODULE_6__["useEffect"])(function () {
    console.log("KEYS: ", envVar);

    if (process.browser) {
      var cartInStorage = localStorage.getItem("soap-cart");

      if (cartInStorage) {
        setCurrentCart(JSON.parse(cartInStorage));
        dispatch({
          type: "SET_INITIAL_BASKET",
          payload: JSON.parse(cartInStorage)
        });
      }
    }

    if (products.products.length) return;

    _apiCall();
  }, []);

  var _apiCall = /*#__PURE__*/function () {
    var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee() {
      var res;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _helpers__WEBPACK_IMPORTED_MODULE_10__["myApi"].send("/products", "GET", undefined, "public");

            case 2:
              res = _context.sent;
              console.log("MYAPI PRODUCTS ", res);
              dispatch({
                type: "FETCH_PRODUCTS",
                payload: res
              });
              console.log("HOME PROPS ", props);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function _apiCall() {
      return _ref.apply(this, arguments);
    };
  }();

  Object(react__WEBPACK_IMPORTED_MODULE_6__["useEffect"])(function () {
    console.log("Changed Cart", currentCart);
  }, [currentCart]);

  var handleClick = function handleClick(id) {
    console.log("event");
    var selected = products.products.filter(function (product) {
      return product.id === id;
    });
    setSelectedProduct(selected[0]);
    console.log("SELECTED", selectedProduct);
    toggle();
  };

  var viewProduct = function viewProduct(id) {
    history.push("/product/".concat(id));
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_6___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_11__["Hero"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 83,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("img", {
    src: "/drips.png",
    alt: "drips",
    style: {
      "float": "right",
      width: "500px",
      transform: "translateY(-30px)"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 84,
      columnNumber: 9
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("img", {
    src: "/logo-big.svg",
    alt: "chunky soap",
    style: {
      "float": "left",
      width: "450px",
      transform: "translateX(-40px)"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 93,
      columnNumber: 9
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("img", {
    className: "girl-pic",
    src: "/girl.webp",
    alt: "chunky soap girl",
    style: {
      position: "absolute",
      width: "480px",
      transform: "translateX(-120px)",
      top: 188
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 102,
      columnNumber: 9
    }
  }), _styles_variables__WEBPACK_IMPORTED_MODULE_18__["heroBubbles"].map(function (b, i) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_styles_ui__WEBPACK_IMPORTED_MODULE_13__["Bubble"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2___default()({}, b, {
      key: i,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 114,
        columnNumber: 11
      }
    }));
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
    style: {
      top: 260,
      left: "800px",
      width: 550,
      position: "absolute"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 116,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_12__["BannerHeading"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 119,
      columnNumber: 11
    }
  }, "Natural soap bars & creams for all skin types"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_12__["BannerHeading2"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 122,
      columnNumber: 11
    }
  }, "Because beauty is a fragile gift.."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_styles_components_button__WEBPACK_IMPORTED_MODULE_15__["default"], {
    primary: true,
    big: true,
    style: {
      marginLeft: '70px',
      marginTop: '50px'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 123,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
    className: "script-font",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 124,
      columnNumber: 13
    }
  }, "Visit Shop")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_11__["Container"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 130,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(Bubbles, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 131,
      columnNumber: 9
    }
  }, _styles_variables__WEBPACK_IMPORTED_MODULE_18__["bodyBubbles"].map(function (b, i) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_styles_ui__WEBPACK_IMPORTED_MODULE_13__["Bubble"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2___default()({}, b, {
      key: i,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 133,
        columnNumber: 13
      }
    }));
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_16__["ProductSearch"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 136,
      columnNumber: 9
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_12__["SectionHeading"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 137,
      columnNumber: 9
    }
  }, "Featured Products"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_components_ui_ProductSlider__WEBPACK_IMPORTED_MODULE_14__["default"], {
    perPage: 3,
    data: featured,
    handleClick: handleClick,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 138,
      columnNumber: 9
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_16__["CategoryRow"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 139,
      columnNumber: 9
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_12__["SectionHeading"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 140,
      columnNumber: 9
    }
  }, "Most Popular Products"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_components_ui_ProductSlider__WEBPACK_IMPORTED_MODULE_14__["default"], {
    perPage: 3,
    data: popular,
    handleClick: handleClick,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 141,
      columnNumber: 9
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
    style: {
      marginTop: '-100px'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 143,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_16__["OptIn"], {
    cols: "100%",
    height: 200,
    valid: false,
    loading: false,
    btnText: "Subscribe",
    placeholder: "your email address",
    label: "Subscribe to our newsletter to get special deals",
    handleChange: function handleChange(e) {
      setOptinMail(_objectSpread(_objectSpread({}, optinMail), {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()({}, 'email', e.target.value)));
    },
    handleSubmit: function handleSubmit() {
      console.log('submitting: ', optinMail);
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 144,
      columnNumber: 7
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_16__["Footer"], {
    height: 800,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 156,
      columnNumber: 7
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_16__["Modal"], {
    isShowing: isShowing,
    hide: toggle,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 157,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_16__["ProductPreview"], {
    product: selectedProduct,
    viewProduct: viewProduct,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 158,
      columnNumber: 9
    }
  })));
}
var Bubbles = styled_components__WEBPACK_IMPORTED_MODULE_9___default.a.div(_templateObject());

/***/ }),

/***/ "./src/containers/InvoicePage.js":
/*!***************************************!*\
  !*** ./src/containers/InvoicePage.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var jspdf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! jspdf */ "jspdf");
/* harmony import */ var jspdf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(jspdf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../helpers */ "./src/helpers/index.js");
/* harmony import */ var _styles_typography__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../styles/typography */ "./src/styles/typography.js");
/* harmony import */ var _styles_layout__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../styles/layout */ "./src/styles/layout.js");



var _jsxFileName = "/home/webnostix/Codebase/ChunkySoap2021/client/src/containers/InvoicePage.js";







var InvoicePage = function InvoicePage(props) {
  var _id = props.match.params._id;
  var history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["useHistory"])();

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(undefined),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_useState, 2),
      order = _useState2[0],
      setOrder = _useState2[1];

  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    apiCall();
  }, []);

  var apiCall = /*#__PURE__*/function () {
    var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
      var order;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _helpers__WEBPACK_IMPORTED_MODULE_6__["myApi"].send("/orders/".concat(_id), 'GET', undefined, 'public');

            case 2:
              order = _context.sent;
              setOrder(order);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function apiCall() {
      return _ref.apply(this, arguments);
    };
  }();

  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    console.log("ORDER: ", order);
  }, [order]);

  var generateInvoice = function generateInvoice() {
    var doc = new jspdf__WEBPACK_IMPORTED_MODULE_5___default.a('p', 'pt', 'a4');
    doc.html(document.querySelector('#content'), {
      callback: function callback(pdf) {
        var pageCount = doc.internal.getNumberOfPages();
        pdf.deletePage(pageCount);
        pdf.save("".concat(_id, ".pdf"));
      }
    });
  };

  var renderInvoice = function renderInvoice() {
    var order_items = order.order_items,
        order_total = order.order_total,
        shipping_carrier = order.order_carrier.shipping_carrier,
        _order$order_customer = order.order_customer,
        customer_address1 = _order$order_customer.customer_address1,
        customer_address2 = _order$order_customer.customer_address2,
        customer_firstname = _order$order_customer.customer_firstname,
        customer_lastname = _order$order_customer.customer_lastname,
        customer_town = _order$order_customer.customer_town,
        customer_postcode = _order$order_customer.customer_postcode;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_8__["Invoice"], {
      id: "invoice",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 61,
        columnNumber: 9
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_8__["Logo"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 62,
        columnNumber: 11
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_7__["Heading3"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 63,
        columnNumber: 13
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("img", {
      src: "/logo.jpg",
      style: {
        width: '130px'
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 64,
        columnNumber: 15
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("br", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 64,
        columnNumber: 62
      }
    }), "RECEIPT")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_8__["Address"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 68,
        columnNumber: 11
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_7__["Paragraph"], {
      sml: true,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 69,
        columnNumber: 15
      }
    }, customer_firstname, " ", customer_lastname), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_7__["Paragraph"], {
      sml: true,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 72,
        columnNumber: 15
      }
    }, customer_address1), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_7__["Paragraph"], {
      sml: true,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 75,
        columnNumber: 15
      }
    }, customer_address2), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_7__["Paragraph"], {
      sml: true,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 78,
        columnNumber: 15
      }
    }, customer_town), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_7__["Paragraph"], {
      sml: true,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 81,
        columnNumber: 15
      }
    }, customer_postcode)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_8__["ProductName"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 85,
        columnNumber: 11
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_7__["Paragraph"], {
      sml: true,
      heavy: true,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 86,
        columnNumber: 13
      }
    }, "Item"), order_items && order_items.products.map(function (item, i) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("p", {
        key: i,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 91,
          columnNumber: 13
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_7__["Paragraph"], {
        sml: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 92,
          columnNumber: 15
        }
      }, item.product_name));
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_7__["Paragraph"], {
      sml: true,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 97,
        columnNumber: 11
      }
    }, "Postage: ", shipping_carrier)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_8__["ProductQty"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 101,
        columnNumber: 11
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_7__["Paragraph"], {
      sml: true,
      heavy: true,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 102,
        columnNumber: 13
      }
    }, "Quantity"), order_items && order_items.products.map(function (item, i) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_7__["Paragraph"], {
        sml: true,
        key: i,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 106,
          columnNumber: 17
        }
      }, item.product_qty);
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_8__["ProductTotal"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 111,
        columnNumber: 11
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_7__["Paragraph"], {
      sml: true,
      heavy: true,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 112,
        columnNumber: 13
      }
    }, "Price"), order_items && order_items.products.map(function (item, i) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_7__["Paragraph"], {
        sml: true,
        key: i,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 116,
          columnNumber: 15
        }
      }, "\xA3 ", item.total_price.toFixed(2));
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_7__["Paragraph"], {
      sml: true,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 120,
        columnNumber: 13
      }
    }, "\xA3 ", order_items.postage.toFixed(2))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_8__["Footer"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 124,
        columnNumber: 11
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_7__["Paragraph"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 125,
        columnNumber: 13
      }
    }, "Total")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_8__["FooterTotal"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 127,
        columnNumber: 11
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_7__["Paragraph"], {
      heavy: true,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 128,
        columnNumber: 13
      }
    }, "\xA3 ", order_total)));
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 137,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_8__["Container"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 138,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_8__["Section"], {
    light: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 139,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("button", {
    style: {
      marginBottom: '30px'
    },
    onClick: function onClick() {
      return history.push('/admin');
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 140,
      columnNumber: 11
    }
  }, "Back"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("button", {
    style: {
      marginBottom: '30px'
    },
    onClick: function onClick() {
      return generateInvoice();
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 141,
      columnNumber: 11
    }
  }, "Download Invoice"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    id: "content",
    style: {
      height: '838px',
      width: '591px',
      padding: '4px'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 142,
      columnNumber: 13
    }
  }, order && renderInvoice()))));
};

/* harmony default export */ __webpack_exports__["default"] = (InvoicePage);

/***/ }),

/***/ "./src/containers/ProductPage.js":
/*!***************************************!*\
  !*** ./src/containers/ProductPage.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_feather__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-feather */ "react-feather");
/* harmony import */ var react_feather__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_feather__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _styles_typography__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../styles/typography */ "./src/styles/typography.js");
/* harmony import */ var _styles_layout__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../styles/layout */ "./src/styles/layout.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../helpers */ "./src/helpers/index.js");
/* harmony import */ var _styles_ui_productFrame__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../styles/ui/productFrame */ "./src/styles/ui/productFrame.js");
/* harmony import */ var _components_ui_AddToCartBtn__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../components/ui/AddToCartBtn */ "./src/components/ui/AddToCartBtn.js");
/* harmony import */ var _components_ui_AnimatedButton__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../components/ui/AnimatedButton */ "./src/components/ui/AnimatedButton.js");




var _jsxFileName = "/home/webnostix/Codebase/ChunkySoap2021/client/src/containers/ProductPage.js";

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n    background-color: transparent;\n    border: transparent solid 1px;\n    width: 50px;\n    height: 50px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}













var ProductPage = function ProductPage(props) {
  var _useParams = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_6__["useParams"])(),
      _id = _useParams._id;

  var _useSelector = Object(react_redux__WEBPACK_IMPORTED_MODULE_5__["useSelector"])(function (_ref) {
    var currentProduct = _ref.currentProduct.currentProduct;
    return {
      currentProduct: currentProduct
    };
  }),
      currentProduct = _useSelector.currentProduct;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(1),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3___default()(_useState, 2),
      quantity = _useState2[0],
      setQuantity = _useState2[1];

  var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_5__["useDispatch"])();
  var history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_6__["useHistory"])();
  Object(react__WEBPACK_IMPORTED_MODULE_4__["useEffect"])(function () {
    apiCall();
  }, [_id]);

  var apiCall = /*#__PURE__*/function () {
    var _ref2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee() {
      var res;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _helpers__WEBPACK_IMPORTED_MODULE_11__["myApi"].send("/products?id=".concat(_id), 'GET', undefined, 'public');

            case 2:
              res = _context.sent;
              dispatch({
                type: 'FETCH_PRODUCT',
                payload: res[0]
              });

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function apiCall() {
      return _ref2.apply(this, arguments);
    };
  }();

  var decreaseQuantity = Object(react__WEBPACK_IMPORTED_MODULE_4__["useCallback"])(function () {
    var newQuantity = quantity >= 2 ? quantity - 1 : quantity;
    console.log(newQuantity);
    setQuantity(newQuantity);
  });
  var increaseQuantity = Object(react__WEBPACK_IMPORTED_MODULE_4__["useCallback"])(function () {
    console.log("triggered");
    var newQuantity = quantity < 100 ? quantity + 1 : quantity;
    console.log(newQuantity);
    setQuantity(newQuantity);
  });
  var product_name = currentProduct.product_name,
      product_short_description = currentProduct.product_short_description,
      product_picture_1 = currentProduct.product_picture_1,
      product_long_description = currentProduct.product_long_description,
      product_price = currentProduct.product_price,
      product_discount = currentProduct.product_discount;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_4___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("img", {
    src: "/drips-dark.svg",
    style: {
      position: 'absolute',
      right: 0,
      top: 70,
      width: 500,
      zIndex: 1
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46,
      columnNumber: 13
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_10__["Container"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_10__["Wrapper"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_10__["Section"], {
    light: true,
    height: 1050,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49,
      columnNumber: 17
    }
  }, currentProduct && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_4___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
    style: {
      padding: '30px 0px 100px 0px',
      maxWidth: 800,
      zIndex: 1000,
      position: 'relative'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53,
      columnNumber: 29
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_9__["Heading1"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54,
      columnNumber: 33
    }
  }, product_name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_9__["Heading2"], {
    light: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55,
      columnNumber: 33
    }
  }, product_short_description)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: "columm",
      paddingLeft: '200',
      width: '100%',
      height: 700,
      zIndex: 2000,
      position: 'relative'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 29
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
    id: "leftside",
    style: {
      flex: 2,
      paddingLeft: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      textAlign: 'right'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 58,
      columnNumber: 33
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_styles_ui_productFrame__WEBPACK_IMPORTED_MODULE_12__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59,
      columnNumber: 37
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("img", {
    src: product_picture_1 && "http://localhost:1337".concat(product_picture_1.url),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60,
      columnNumber: 41
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
    style: {
      flex: 1,
      marginTop: 50
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62,
      columnNumber: 41
    }
  }, product_discount > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'baseline',
      opacity: 0.4,
      justifyContent: 'flex-end'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64,
      columnNumber: 49
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_9__["Heading3"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 65,
      columnNumber: 49
    }
  }, "Original Price. "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_9__["Heading1"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 66,
      columnNumber: 49
    }
  }, " \xA3", product_price.toFixed(2))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'baseline',
      justifyContent: 'flex-end'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 69,
      columnNumber: 45
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_9__["Heading3"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 70,
      columnNumber: 45
    }
  }, product_discount > 0 ? 'Sale Price.' : 'Price.'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_9__["Heading1"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 71,
      columnNumber: 45
    }
  }, " \xA3", (product_price - product_price * product_discount / 100).toFixed(2)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      width: "100%",
      margin: '10px 0px'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 74,
      columnNumber: 41
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_9__["Paragraph"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 75,
      columnNumber: 45
    }
  }, "Quantity"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(SimpleButton, {
    onClick: function onClick() {
      return decreaseQuantity();
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 76,
      columnNumber: 43
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_feather__WEBPACK_IMPORTED_MODULE_8__["MinusCircle"], {
    color: "pink",
    size: 34,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 77,
      columnNumber: 47
    }
  })), " ", quantity, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(SimpleButton, {
    onClick: function onClick() {
      return increaseQuantity();
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 79,
      columnNumber: 43
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_feather__WEBPACK_IMPORTED_MODULE_8__["PlusCircle"], {
    color: "pink",
    size: 34,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 80,
      columnNumber: 44
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
    style: {
      flex: 1
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 83,
      columnNumber: 41
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_components_ui_AddToCartBtn__WEBPACK_IMPORTED_MODULE_13__["default"], {
    quantity: quantity,
    product: currentProduct,
    "function": "add",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 84,
      columnNumber: 45
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
    id: "rightside",
    style: {
      flex: 4,
      paddingLeft: 100,
      paddingRight: 100
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 87,
      columnNumber: 33
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_9__["Heading2"], {
    dark: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 88,
      columnNumber: 37
    }
  }, "Product Description"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
    style: {
      minHeight: 540
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 89,
      columnNumber: 41
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_9__["Paragraph"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 90,
      columnNumber: 45
    }
  }, product_long_description)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_10__["ButtonRow"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 92,
      columnNumber: 41
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_components_ui_AnimatedButton__WEBPACK_IMPORTED_MODULE_14__["default"], {
    big: true,
    text: "Back",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 93,
      columnNumber: 45
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_feather__WEBPACK_IMPORTED_MODULE_8__["ArrowLeft"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 93,
      columnNumber: 78
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_components_ui_AnimatedButton__WEBPACK_IMPORTED_MODULE_14__["default"], {
    big: true,
    primary: true,
    text: "View Basket",
    handleClick: function handleClick() {
      return history.push('/basket');
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 94,
      columnNumber: 45
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_feather__WEBPACK_IMPORTED_MODULE_8__["CreditCard"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 94,
      columnNumber: 136
    }
  }))))))))));
};

/* harmony default export */ __webpack_exports__["default"] = (ProductPage);
var SimpleButton = styled_components__WEBPACK_IMPORTED_MODULE_7___default.a.button(_templateObject());

/***/ }),

/***/ "./src/containers/SearchResults.js":
/*!*****************************************!*\
  !*** ./src/containers/SearchResults.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/layout */ "./src/components/layout/index.js");
/* harmony import */ var _components_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/ui */ "./src/components/ui/index.js");
/* harmony import */ var _styles_layout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../styles/layout */ "./src/styles/layout.js");
/* harmony import */ var _styles_typography__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../styles/typography */ "./src/styles/typography.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components */ "./src/components/index.js");
/* harmony import */ var _hooks_useModal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../hooks/useModal */ "./src/hooks/useModal.js");
var _jsxFileName = "/home/webnostix/Codebase/ChunkySoap2021/client/src/containers/SearchResults.js";










var SearchResults = function SearchResults(props) {
  var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useDispatch"])();
  var history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["useHistory"])();
  var searchResults = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(function (state) {
    return state["searchResults"].searchResults[0];
  });
  var products = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(function (state) {
    return state.products;
  });

  var _useModal = Object(_hooks_useModal__WEBPACK_IMPORTED_MODULE_8__["default"])({
    products: products
  }),
      isShowing = _useModal.isShowing,
      toggle = _useModal.toggle,
      handleClick = _useModal.handleClick,
      selectedProduct = _useModal.selectedProduct;

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    console.log("__PRODUCTS: ", searchResults);
  }, [searchResults]);

  var viewProduct = function viewProduct(id) {
    history.push("/product/".concat(id));
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_7__["ProductSearch"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 13
    }
  }), searchResults ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_5__["Container"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_6__["SectionHeading"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 25
    }
  }, "Your in luck!, here a your matches"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_ui__WEBPACK_IMPORTED_MODULE_4__["ProductSlider"], {
    perPage: 3,
    data: searchResults,
    handleClick: handleClick,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 25
    }
  })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_5__["Container"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_5__["Section"], {
    light: true,
    height: 400,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 25
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_6__["SectionHeading"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 29
    }
  }, "Ooops! We don't have that"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_7__["Footer"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43,
      columnNumber: 13
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_7__["Modal"], {
    isShowing: isShowing,
    hide: toggle,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_7__["ProductPreview"], {
    product: selectedProduct,
    viewProduct: viewProduct,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45,
      columnNumber: 17
    }
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (Object(_components_layout__WEBPACK_IMPORTED_MODULE_3__["withHero"])({
  component: SearchResults
}));

/***/ }),

/***/ "./src/containers/forms.json":
/*!***********************************!*\
  !*** ./src/containers/forms.json ***!
  \***********************************/
/*! exports provided: views, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"views\":{\"addressForm\":[{\"placeholder\":\"\",\"label\":\"Title\",\"type\":\"text\",\"name\":\"customer_title\",\"width\":\"20%\",\"required\":true,\"value\":\"customer_title\"},{\"placeholder\":\"\",\"label\":\"Firstname\",\"type\":\"text\",\"name\":\"customer_firstname\",\"width\":\"40%\",\"required\":true,\"value\":\"customer_firstname\"},{\"placeholder\":\"\",\"label\":\"Lastname\",\"type\":\"text\",\"name\":\"customer_lastname\",\"width\":\"40%\",\"required\":true,\"value\":\"customer_lastname\"},{\"placeholder\":\"\",\"label\":\"Address 1\",\"type\":\"text\",\"name\":\"customer_address1\",\"width\":\"50%\",\"require\":true,\"value\":\"customer_address1\"},{\"placeholder\":\"\",\"label\":\"Address 2\",\"type\":\"text\",\"name\":\"customer_address2\",\"width\":\"50%\",\"value\":\"customer_address2\"},{\"placeholder\":\"\",\"label\":\"Town / City\",\"type\":\"text\",\"name\":\"customer_town\",\"width\":\"50%\",\"required\":true,\"value\":\"customer_town\"},{\"placeholder\":\"\",\"label\":\"Postcode\",\"type\":\"text\",\"name\":\"customer_postcode\",\"width\":\"30%\",\"required\":true,\"value\":\"customer_postcode\"}],\"login\":[{\"placeholder\":\"example@gmail.com\",\"label\":\"Email Address\",\"type\":\"email\",\"name\":\"email\",\"required\":true},{\"placeholder\":\"*********\",\"label\":\"Password\",\"type\":\"password\",\"name\":\"password\",\"required\":true}],\"register\":[{\"placeholder\":\"Your Username\",\"label\":\"Username\",\"type\":\"text\",\"name\":\"username\",\"required\":true},{\"placeholder\":\"example@gmail.com\",\"label\":\"Email Address\",\"type\":\"text\",\"name\":\"email\"},{\"placeholder\":\"*********\",\"label\":\"Password\",\"type\":\"password\",\"name\":\"password\"},{\"placeholder\":\"*********\",\"label\":\"Confirm Password\",\"type\":\"password\",\"name\":\"password_confirmation\"}],\"forgot-password\":[{\"placeholder\":\"example@gmail.com\",\"label\":\"Email Address\",\"type\":\"text\",\"name\":\"email\"}]}}");

/***/ }),

/***/ "./src/containers/index.js":
/*!*********************************!*\
  !*** ./src/containers/index.js ***!
  \*********************************/
/*! exports provided: AdminPage, AuthPage, HomePage, CategoriesPage, CheckoutPage, ProductPage, SearchResults, InvoicePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AdminPage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AdminPage */ "./src/containers/AdminPage.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AdminPage", function() { return _AdminPage__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _AuthPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AuthPage */ "./src/containers/AuthPage.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthPage", function() { return _AuthPage__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _HomePage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./HomePage */ "./src/containers/HomePage.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HomePage", function() { return _HomePage__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _CategoriesPage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CategoriesPage */ "./src/containers/CategoriesPage.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CategoriesPage", function() { return _CategoriesPage__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _CheckoutPage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CheckoutPage */ "./src/containers/CheckoutPage.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CheckoutPage", function() { return _CheckoutPage__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _ProductPage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ProductPage */ "./src/containers/ProductPage.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ProductPage", function() { return _ProductPage__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _SearchResults__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SearchResults */ "./src/containers/SearchResults.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SearchResults", function() { return _SearchResults__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _InvoicePage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./InvoicePage */ "./src/containers/InvoicePage.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InvoicePage", function() { return _InvoicePage__WEBPACK_IMPORTED_MODULE_7__["default"]; });










/***/ }),

/***/ "./src/helpers/api.js":
/*!****************************!*\
  !*** ./src/helpers/api.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);



// import { fn } from '.';
var promiseRetry = __webpack_require__(/*! promise-retry */ "promise-retry");

/* harmony default export */ __webpack_exports__["default"] = ({
  /**
   * ( uses fetch to make authorized api requests )
   *
   * @param {*} url
   * @param {*} method
   * @param {*} data
   * @returns
   */
  send: function send(url, method, data) {
    var _arguments = arguments;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
      var type, apiAddress, token, baseURL, myHeaders, raw, requestOptions, retryFetch;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              type = _arguments.length > 3 && _arguments[3] !== undefined ? _arguments[3] : "protected";
              // const apiAddress = process.env.RAZZLE_API_URI 
              apiAddress =  false ? undefined : "http://localhost:1337"; // fn.getApiAddress()

              _context.next = 4;
              return JSON.parse(sessionStorage.getItem("jwtToken"));

            case 4:
              token = _context.sent;
              // await fn.getTokenFromStorage('sessionToken')
              console.log("TOKEN ", token);
              baseURL = "".concat(apiAddress);
              myHeaders = new Headers();
              myHeaders.append("Content-Type", "application/json");

              if (token !== "" && type !== "public") {
                myHeaders.append("Authorization", "Bearer ".concat(token));
              }

              raw = JSON.stringify(data);
              console.log("raw data ", raw);
              requestOptions = {
                method: method,
                headers: myHeaders,
                body: raw,
                redirect: "follow"
              }; // return fetch(`${baseURL}${url}`, requestOptions)
              //   .then((response) => {
              //     console.log("fetch response ", response);
              //     if(response.status === 200) return response.json();
              //     if (retries > 0) {
              //       return fetch(`${baseURL}${url}`, requestOptions, retries - 1)
              //       console.log("error", error)
              //     }
              //   })
              //   .then((result) => {
              //     console.log("reftch result ", result);
              //     return result;
              //   })
              //   .catch(error => {
              //     console.log(error)
              //     if (retries > 0) {
              //       retries - 1
              //       return fetch(`${baseURL}${url}`, requestOptions)
              //     }
              //   }
              //   );

              /**
               * (retryFetch returns fetch which recursively calls itself if the request fails)
               *
               * @param {*} url
               * @param {*} options
               * @param {integer} retries
               * @returns fetch
               */

              retryFetch = function retryFetch(url, options) {
                var retries = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;
                var retryCodes = [401, 408, 500, 502, 503, 504, 522, 524];
                return fetch(url, options).then(function (response) {
                  console.log('STATUS', response.status);
                  if (response.status === 200) return response.json();

                  if (retries > 0 && retryCodes.includes(response.status)) {
                    console.log('retries ', retries);
                    return retryFetch(url, options, retries - 1);
                  } else {
                    throw new Error(response);
                  }
                })["catch"](console.error);
              };

              return _context.abrupt("return", retryFetch("".concat(baseURL).concat(url), requestOptions));

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  }
});

/***/ }),

/***/ "./src/helpers/auth.js":
/*!*****************************!*\
  !*** ./src/helpers/auth.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var universal_cookie__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! universal-cookie */ "universal-cookie");
/* harmony import */ var universal_cookie__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(universal_cookie__WEBPACK_IMPORTED_MODULE_1__);


var cookies = new universal_cookie__WEBPACK_IMPORTED_MODULE_1___default.a();
var TOKEN_KEY = 'jwtToken';
var USER_INFO = 'userInfo';
var parse = JSON.parse;
var stringify = JSON.stringify;
var auth = {
  /**
   * Remove an item from the used storage
   * @param  {String} key [description]
   */
  clear: function clear(key) {
    if (localStorage && localStorage.getItem(key)) {
      return localStorage.removeItem(key);
    }

    if (sessionStorage && sessionStorage.getItem(key)) {
      return sessionStorage.removeItem(key);
    }

    return null;
  },

  /**
   * Clear all app storage
   */
  clearAppStorage: function clearAppStorage() {
    if (localStorage) {
      return localStorage.clear();
    }

    if (sessionStorage) {
      return sessionStorage.clear();
    }
  },

  /**
   * Clear all user info
   * @param {*} tokenKey 
   * @returns 
   */
  clearUser: function clearUser() {
    console.log("TOKEN CLEARER ");
    this.clearUserInfo();
    this.clearToken();
  },
  clearToken: function clearToken() {
    var tokenKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : TOKEN_KEY;
    return auth.clear(tokenKey);
  },
  clearUserInfo: function clearUserInfo() {
    var userInfo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : USER_INFO;
    return auth.clear(userInfo);
  },

  /**
   * Returns data from storage
   * @param  {String} key Item to get from the storage
   * @return {String|Object}     Data from the storage
   */
  get: function get(key) {
    if (localStorage && localStorage.getItem(key)) {
      return parse(localStorage.getItem(key)) || null;
    }

    if (sessionStorage && sessionStorage.getItem(key)) {
      return parse(sessionStorage.getItem(key)) || null;
    }

    return null;
  },
  getToken: function getToken() {
    var tokenKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : TOKEN_KEY;
    return auth.get(tokenKey);
  },
  getUserInfo: function getUserInfo() {
    var userInfo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : USER_INFO;
    return auth.get(userInfo);
  },

  /**
   * Set data in storage
   * @param {String|Object}  value    The data to store
   * @param {String}  key
   * @param {Boolean} isLocalStorage  Defines if we need to store in localStorage or sessionStorage
   */
  set: function set(value, key, isLocalStorage) {
    if (Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isEmpty"])(value)) {
      return null;
    }

    cookies.set(key, stringify(value));

    if (isLocalStorage && localStorage) {
      return localStorage.setItem(key, stringify(value));
    }

    if (sessionStorage) {
      return sessionStorage.setItem(key, stringify(value));
    }

    return null;
  },
  setToken: function setToken() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var isLocalStorage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var tokenKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TOKEN_KEY;
    return auth.set(value, tokenKey, isLocalStorage);
  },
  setUserInfo: function setUserInfo() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var isLocalStorage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var userInfo = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : USER_INFO;
    return auth.set(value, userInfo, isLocalStorage);
  }
};
/* harmony default export */ __webpack_exports__["default"] = (auth);

/***/ }),

/***/ "./src/helpers/functions.js":
/*!**********************************!*\
  !*** ./src/helpers/functions.js ***!
  \**********************************/
/*! exports provided: getCartTotal, isEmpty, createExcerpt, pathMatches, convertDate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCartTotal", function() { return getCartTotal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEmpty", function() { return isEmpty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createExcerpt", function() { return createExcerpt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pathMatches", function() { return pathMatches; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertDate", function() { return convertDate; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "moment");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);


var getCartTotal = function getCartTotal(cart) {
  var postage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var tax = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  if (cart.length) {
    var totals = cart.map(function (item) {
      return item.total_price;
    });
    var tmpValue = totals.reduce(function (a, b) {
      return a + b;
    });
    var basketValue = tmpValue + postage + tax; // .toFixed(2)

    return basketValue;
  }

  return 0.00;
};
var isEmpty = function isEmpty(data) {
  return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isEmpty(data);
};
var createExcerpt = function createExcerpt(string, length) {
  return string.length > length ? string.substring(0, length - 3) + '...  ' : string + " ";
};
var pathMatches = function pathMatches(str) {
  // console.log("PATH " , str)
  var regex = /^\/([^?\/]+)/;

  if (str === '/') {
    return "/"; // str.match(regex)
  } // console.log("PATH MATCH ", str.match(regex)[0])


  return str.match(regex)[0];
};
var convertDate = function convertDate(date) {
  console.log('FN DATE', date);
  console.log(moment__WEBPACK_IMPORTED_MODULE_1___default()(Date(date)).format('dd MMM Do'));
  return moment__WEBPACK_IMPORTED_MODULE_1___default()(date).format('ddd MMM Do');
};

/***/ }),

/***/ "./src/helpers/index.js":
/*!******************************!*\
  !*** ./src/helpers/index.js ***!
  \******************************/
/*! exports provided: auth, request, myApi, strapi */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth */ "./src/helpers/auth.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "auth", function() { return _auth__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _request__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./request */ "./src/helpers/request.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "request", function() { return _request__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./api */ "./src/helpers/api.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "myApi", function() { return _api__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _strapi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./strapi */ "./src/helpers/strapi.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "strapi", function() { return _strapi__WEBPACK_IMPORTED_MODULE_3__["default"]; });






/***/ }),

/***/ "./src/helpers/request.js":
/*!********************************!*\
  !*** ./src/helpers/request.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return request; });
/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth */ "./src/helpers/auth.js");
// import 'whatwg-fetch';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */

function parseJSON(response) {
  return response.json ? response.json() : response;
}
/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */


function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  return parseJSON(response).then(function (responseFormatted) {
    var error = new Error(response.statusText);
    error.response = response;
    error.response.payload = responseFormatted;
    throw error;
  });
}
/**
 * Format query params
 *
 * @param params
 * @returns {string}
 */


function formatQueryParams(params) {
  return Object.keys(params).map(function (k) {
    return "".concat(encodeURIComponent(k), "=").concat(encodeURIComponent(params[k]));
  }).join('&');
}
/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */


function request(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var stringify = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  // Set headers
  console.log("REQUEST FUNCTION ", url, options);

  if (stringify) {
    options.headers = Object.assign({
      'Content-Type': 'application/json'
    }, options.headers, {});
  }

  var token = _auth__WEBPACK_IMPORTED_MODULE_0__["default"].getToken();

  if (token) {
    options.headers = Object.assign({
      Authorization: "Bearer ".concat(token)
    }, options.headers);
  }

  if (options && options.params) {
    var params = formatQueryParams(options.params);
    url = "".concat(url, "?").concat(params);
  } // Stringify body object


  if (options && options.body && stringify) {
    options.body = JSON.stringify(options.body);
  }

  return fetch(url, options).then(checkStatus).then(parseJSON);
}

/***/ }),

/***/ "./src/helpers/strapi.js":
/*!*******************************!*\
  !*** ./src/helpers/strapi.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ */ "./src/helpers/index.js");



/* harmony default export */ __webpack_exports__["default"] = ({
  login: function login(body, dispatch) {
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
      var API_URI, response;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              API_URI =  false ? undefined : 'http://localhost:1337'; // const API_URI = 'http://localhost:1337'

              _context.prev = 1;
              console.log("STRAPI LOGIN ", body);
              _context.next = 5;
              return Object(___WEBPACK_IMPORTED_MODULE_2__["request"])("".concat(API_URI, "/auth/local/"), {
                method: 'POST',
                body: body
              });

            case 5:
              response = _context.sent;
              console.log("STRAPI RESPONSE ", response); // TODO: use cookies to avoid serverside issues

              ___WEBPACK_IMPORTED_MODULE_2__["auth"].setToken(response.jwt, body.rememberMe);
              ___WEBPACK_IMPORTED_MODULE_2__["auth"].setUserInfo(response.user, body.rememberMe);
              dispatch({
                type: "SET_USER_SESSION",
                payload: response
              });
              return _context.abrupt("return", response);

            case 13:
              _context.prev = 13;
              _context.t0 = _context["catch"](1);
              return _context.abrupt("return", {
                status: 400,
                message: _context.t0
              });

            case 16:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 13]]);
    }))();
  },
  register: function register(body, dispatch) {
    var _this = this;

    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
      var API_URI, response;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              API_URI =  false ? undefined : 'http://localhost:1337'; // const API_URI = 'http://localhost:1337'

              _context2.prev = 1;
              _context2.next = 4;
              return Object(___WEBPACK_IMPORTED_MODULE_2__["request"])("".concat(API_URI, "/auth/local/register/"), {
                method: 'POST',
                body: body
              });

            case 4:
              response = _context2.sent;
              ___WEBPACK_IMPORTED_MODULE_2__["auth"].setToken(response.jwt, body.rememberMe);
              ___WEBPACK_IMPORTED_MODULE_2__["auth"].setUserInfo(response.user, body.rememberMe);
              console.log("NEW USER ", response.user);

              _this.createCustomer(response.user.id, dispatch);

              _context2.next = 14;
              break;

            case 11:
              _context2.prev = 11;
              _context2.t0 = _context2["catch"](1);
              return _context2.abrupt("return", _context2.t0);

            case 14:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 11]]);
    }))();
  },
  createCustomer: function createCustomer(_id, dispatch) {
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3() {
      var customer, res;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              console.log("CREATING CUSTOMER");
              customer = {
                customer_title: "",
                customer_firstname: "",
                customer_lastname: "",
                customer_address1: "",
                customer_address2: "",
                customer_town: "",
                customer_postcode: "",
                customer_created: new Date(),
                user: _id
              };
              _context3.prev = 2;
              _context3.next = 5;
              return ___WEBPACK_IMPORTED_MODULE_2__["myApi"].send('/customers', 'POST', customer);

            case 5:
              res = _context3.sent;
              dispatch({
                type: "SET_USER_SESSION",
                payload: res
              });
              _context3.next = 12;
              break;

            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3["catch"](2);
              return _context3.abrupt("return", _context3.t0);

            case 12:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[2, 9]]);
    }))();
  },
  logout: function logout(dispatch) {
    console.log('LOGGING_OUT');
    ___WEBPACK_IMPORTED_MODULE_2__["auth"].clearUser();
    dispatch({
      type: 'END_USER_SESSION'
    });
  }
});

/***/ }),

/***/ "./src/hooks/index.js":
/*!****************************!*\
  !*** ./src/hooks/index.js ***!
  \****************************/
/*! exports provided: useIsAuthenticated, useModal, useStrapiLogin, usePrevious, useDynamicRef */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _useIsAuthentcated__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./useIsAuthentcated */ "./src/hooks/useIsAuthentcated.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useIsAuthenticated", function() { return _useIsAuthentcated__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _useModal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useModal */ "./src/hooks/useModal.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useModal", function() { return _useModal__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _useStrapiLogin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./useStrapiLogin */ "./src/hooks/useStrapiLogin.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useStrapiLogin", function() { return _useStrapiLogin__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _usePrevious__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./usePrevious */ "./src/hooks/usePrevious.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "usePrevious", function() { return _usePrevious__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _useDynamicRef__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./useDynamicRef */ "./src/hooks/useDynamicRef.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useDynamicRef", function() { return _useDynamicRef__WEBPACK_IMPORTED_MODULE_4__["default"]; });







/***/ }),

/***/ "./src/hooks/useDynamicRef.js":
/*!************************************!*\
  !*** ./src/hooks/useDynamicRef.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "@babel/runtime/helpers/toConsumableArray");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);




var useDynamicRef = function useDynamicRef(itemArray, refPrefix) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])([]),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState, 2),
      refs = _useState2[0],
      setRefs = _useState2[1];

  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    var foo = [];
    console.log('running');
    itemArray.length > 0 && itemArray.map(function (item, i) {
      foo["".concat(refPrefix, "_").concat(i)] = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_2__["createRef"])();
    });
    setRefs([].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(refs), foo));
  }, []);
  console.log("RHOOK", refs);
  return refs;
};

/* harmony default export */ __webpack_exports__["default"] = (useDynamicRef);

/***/ }),

/***/ "./src/hooks/useIsAuthentcated.js":
/*!****************************************!*\
  !*** ./src/hooks/useIsAuthentcated.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers */ "./src/helpers/index.js");




var useIsAuthenticated = function useIsAuthenticated(props) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState, 2),
      isAuthenticated = _useState2[0],
      setIsAuthenticated = _useState2[1];

  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    var authenticated = _helpers__WEBPACK_IMPORTED_MODULE_2__["auth"].getToken() !== null;
    console.log("AUTH TOKEN HERE ", _helpers__WEBPACK_IMPORTED_MODULE_2__["auth"].getToken());
    setIsAuthenticated(authenticated);
  }, []);
  return {
    isAuthenticated: isAuthenticated
  };
};

/* harmony default export */ __webpack_exports__["default"] = (useIsAuthenticated);

/***/ }),

/***/ "./src/hooks/useModal.js":
/*!*******************************!*\
  !*** ./src/hooks/useModal.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);



var useModal = function useModal(_ref) {
  var products = _ref.products;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState, 2),
      isShowing = _useState2[0],
      setIsShowing = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null),
      _useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState3, 2),
      selectedProduct = _useState4[0],
      setSelectedProduct = _useState4[1];

  var handleClick = function handleClick(id) {
    console.log("event", id);
    var selected = products.products.filter(function (product) {
      return product.id === id;
    });
    setSelectedProduct(selected[0]);
    console.log("SELECTED", selectedProduct);
    toggle();
  };

  var toggle = function toggle() {
    setIsShowing(!isShowing);
  };

  return {
    isShowing: isShowing,
    toggle: toggle,
    handleClick: handleClick,
    selectedProduct: selectedProduct
  };
};

/* harmony default export */ __webpack_exports__["default"] = (useModal);

/***/ }),

/***/ "./src/hooks/usePrevious.js":
/*!**********************************!*\
  !*** ./src/hooks/usePrevious.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


var usePrevious = function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  var ref = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(); // Store current value in ref

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)

  return ref.current;
};

/* harmony default export */ __webpack_exports__["default"] = (usePrevious);

/***/ }),

/***/ "./src/hooks/useStrapiLogin.js":
/*!*************************************!*\
  !*** ./src/hooks/useStrapiLogin.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _helpers___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/ */ "./src/helpers/index.js");





var useStrapiLogin = function useStrapiLogin(_ref) {
  var dispatch = _ref.dispatch,
      _ref$loginState$field = _ref.loginState.fields,
      email = _ref$loginState$field.email,
      password = _ref$loginState$field.password,
      register = _ref$loginState$field.register,
      username = _ref$loginState$field.username,
      password_confirmation = _ref$loginState$field.password_confirmation;
  console.log('useStrapiLogin ', register);

  var handleStrapiLogin = /*#__PURE__*/function () {
    var _ref2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
      var body, _body;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              dispatch({
                type: 'LOGGING_IN'
              });

              if (!(register === true)) {
                _context.next = 12;
                break;
              }

              if (!(password !== password_confirmation)) {
                _context.next = 5;
                break;
              }

              console.log("PASSWORDS MUST MATCH ");
              return _context.abrupt("return");

            case 5:
              console.log("REGISTERING NEW USER");
              body = {
                email: email,
                password: password,
                username: username
              };
              _context.next = 9;
              return _helpers___WEBPACK_IMPORTED_MODULE_3__["strapi"].register(body, dispatch);

            case 9:
              dispatch({
                type: 'LOGGED_IN'
              });
              _context.next = 24;
              break;

            case 12:
              console.log("LOGGING IN USER with ", email, password);
              _body = {
                identifier: email,
                password: password,
                username: username
              };
              _context.prev = 14;
              _context.next = 17;
              return _helpers___WEBPACK_IMPORTED_MODULE_3__["strapi"].login(_body, dispatch);

            case 17:
              dispatch({
                type: 'LOGGED_IN'
              });
              _context.next = 24;
              break;

            case 20:
              _context.prev = 20;
              _context.t0 = _context["catch"](14);
              console.log(_context.t0);
              dispatch({
                type: 'LOGIN_FAIL',
                payload: _context.t0
              });

            case 24:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[14, 20]]);
    }));

    return function handleStrapiLogin() {
      return _ref2.apply(this, arguments);
    };
  }();

  return {
    handleStrapiLogin: handleStrapiLogin,
    isLoggedIn: false,
    errorMsg: ''
  };
};

/* harmony default export */ __webpack_exports__["default"] = (useStrapiLogin);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! http */ "http");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_0__);


var app = __webpack_require__(/*! ./server */ "./src/server.js")["default"];

var server = http__WEBPACK_IMPORTED_MODULE_0___default.a.createServer(app);
var currentApp = app;
server.listen("3000" || false, function () {
  console.log('🚀 started');
}).on('error', function (error) {
  console.log(error);
});

if (true) {
  console.log('✅  Server-side HMR Enabled!');
  module.hot.accept(/*! ./server */ "./src/server.js", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { (function () {
    console.log('🔁  HMR Reloading `./server`...');

    try {
      app = __webpack_require__(/*! ./server */ "./src/server.js")["default"];
      server.removeListener('request', currentApp);
      server.on('request', app);
      currentApp = app;
    } catch (error) {
      console.error(error);
    }
  })(__WEBPACK_OUTDATED_DEPENDENCIES__); }.bind(this));
}

/***/ }),

/***/ "./src/reducers/basketReducer.js":
/*!***************************************!*\
  !*** ./src/reducers/basketReducer.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return basketReducer; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "@babel/runtime/helpers/defineProperty");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var initialState = {
  basket: {
    products: [],
    total: 0,
    postage: 0,
    carrierId: null
  }
};
function basketReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  console.log("ADDING", action.payload); // console.log("BASKET SHOULD CONTAIN ", [...state.basket.concat(action.payload)])
  // console.log("STATE FROM REDUCER ", {
  //             ...state,
  //             basket: {
  //                 products: state.basket.products.filter(item => item._id != action.payload._id)
  //             }})

  switch (action.type) {
    case 'SET_INITIAL_BASKET':
      return _objectSpread(_objectSpread({}, state), {}, {
        basket: {
          products: action.payload
        }
      });

    case 'ADD_TO_BASKET':
      return _objectSpread(_objectSpread({}, state), {}, {
        basket: {
          products: action.payload
        }
      });

    case 'REMOVE_FROM_BASKET':
      return _objectSpread(_objectSpread({}, state), {}, {
        basket: {
          products: state.basket.products.filter(function (item) {
            return item._id != action.payload._id;
          })
        }
      });

    case 'UPDATE_TOTAL':
      return _objectSpread(_objectSpread({}, state), {}, {
        total: action.payload
      });

    case 'SET_POSTAGE':
      return _objectSpread(_objectSpread({}, state), {}, {
        basket: _objectSpread(_objectSpread({}, state.basket), {}, {
          postage: action.payload.shipping_cost,
          carrierId: action.payload.id
        })
      });

    default:
      return state;
  }
}

/***/ }),

/***/ "./src/reducers/categoryReducer.js":
/*!*****************************************!*\
  !*** ./src/reducers/categoryReducer.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return categoryReducer; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "@babel/runtime/helpers/defineProperty");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var initialState = {
  categories: [{
    name: "soaps",
    id: 1
  }, {
    name: "Shampoo",
    id: 2
  }, {
    name: "Creams",
    id: 3
  }, {
    name: "fragrances",
    id: 4
  }, {
    name: "body care",
    id: 5
  }]
};
function categoryReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case "FETCH_CATEGORIES":
      return _objectSpread(_objectSpread({}, state), {}, {
        categories: action.payload
      });

    default:
      return state;
  }
}

/***/ }),

/***/ "./src/reducers/currentProductReducer.js":
/*!***********************************************!*\
  !*** ./src/reducers/currentProductReducer.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return currentProductReducer; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "@babel/runtime/helpers/defineProperty");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var initialState = {
  currentProduct: {}
};
function currentProductReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'FETCH_PRODUCT':
      return _objectSpread(_objectSpread({}, state), {}, {
        currentProduct: action.payload
      });

    default:
      return state;
  }
}

/***/ }),

/***/ "./src/reducers/index.js":
/*!*******************************!*\
  !*** ./src/reducers/index.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "redux");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _productReducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./productReducer */ "./src/reducers/productReducer.js");
/* harmony import */ var _userReducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./userReducer */ "./src/reducers/userReducer.js");
/* harmony import */ var _basketReducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./basketReducer */ "./src/reducers/basketReducer.js");
/* harmony import */ var _categoryReducer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./categoryReducer */ "./src/reducers/categoryReducer.js");
/* harmony import */ var _currentProductReducer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./currentProductReducer */ "./src/reducers/currentProductReducer.js");
/* harmony import */ var _searchReducer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./searchReducer */ "./src/reducers/searchReducer.js");
/* harmony import */ var _ordersReducer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ordersReducer */ "./src/reducers/ordersReducer.js");








/* harmony default export */ __webpack_exports__["default"] = (Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])({
  currentProduct: _currentProductReducer__WEBPACK_IMPORTED_MODULE_5__["default"],
  products: _productReducer__WEBPACK_IMPORTED_MODULE_1__["default"],
  basket: _basketReducer__WEBPACK_IMPORTED_MODULE_3__["default"],
  categories: _categoryReducer__WEBPACK_IMPORTED_MODULE_4__["default"],
  user: _userReducer__WEBPACK_IMPORTED_MODULE_2__["default"],
  searchResults: _searchReducer__WEBPACK_IMPORTED_MODULE_6__["default"],
  orders: _ordersReducer__WEBPACK_IMPORTED_MODULE_7__["default"]
}));

/***/ }),

/***/ "./src/reducers/ordersReducer.js":
/*!***************************************!*\
  !*** ./src/reducers/ordersReducer.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "@babel/runtime/helpers/defineProperty");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var initialState = {
  orders: {}
};

var ordersReducer = function ordersReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'GET_ORDERS':
      return _objectSpread(_objectSpread({}, state), {}, {
        orders: action.payload
      });

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (ordersReducer);

/***/ }),

/***/ "./src/reducers/productReducer.js":
/*!****************************************!*\
  !*** ./src/reducers/productReducer.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return productReducer; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "@babel/runtime/helpers/defineProperty");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var initialState = {
  products: []
};
function productReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  console.log("FETCH", action.payload);
  console.log("CATEGORIES ", state.categories);
  console.log("state should be ", action.payload);

  switch (action.type) {
    case 'FETCH_PRODUCTS':
      return _objectSpread(_objectSpread({}, state), {}, {
        products: action.payload
      });

    default:
      return state;
  }
}

/***/ }),

/***/ "./src/reducers/searchReducer.js":
/*!***************************************!*\
  !*** ./src/reducers/searchReducer.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "@babel/runtime/helpers/defineProperty");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var initialState = {
  searchResults: []
};

var searchReducer = function searchReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'UPDATE_SEARCH':
      return _objectSpread(_objectSpread({}, state), {}, {
        searchResults: action.payload
      });

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (searchReducer);

/***/ }),

/***/ "./src/reducers/userReducer.js":
/*!*************************************!*\
  !*** ./src/reducers/userReducer.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return userReducer; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "@babel/runtime/helpers/defineProperty");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var initialState = {
  user: {}
};
function userReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'SET_USER_SESSION':
      return _objectSpread(_objectSpread({}, state), {}, {
        user: action.payload
      });

    case 'END_USER_SESSION':
      return _objectSpread(_objectSpread({}, state), {}, {
        user: {}
      });

    default:
      return state;
  }
}

/***/ }),

/***/ "./src/server.js":
/*!***********************!*\
  !*** ./src/server.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App */ "./src/App.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-dom/server */ "react-dom/server");
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _src_api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../src/api */ "./src/api/index.js");
var _jsxFileName = "/home/webnostix/Codebase/ChunkySoap2021/client/src/server.js";







var path = __webpack_require__(/*! path */ "path");

var stripeCallHandler = function stripeCallHandler(req, res) {
  console.log("STRIPE HANDLER ", req.query.data);
  res.status(200).json(JSON.parse(req.query.data));
};

var assets = __webpack_require__(/*! ./build/assets.json */ "./build/assets.json");

var publicFolder =  false ? undefined : "/home/webnostix/Codebase/ChunkySoap2021/client/public";
var server = express__WEBPACK_IMPORTED_MODULE_3___default()();
server.disable('x-powered-by').use(express__WEBPACK_IMPORTED_MODULE_3___default.a["static"](publicFolder)).get('/api/stripe-payment', stripeCallHandler).get('/api/payment_intents', _src_api__WEBPACK_IMPORTED_MODULE_5__["payment_intents"]).get('/*', function (req, res) {
  var context = {};
  var markup = Object(react_dom_server__WEBPACK_IMPORTED_MODULE_4__["renderToString"])( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["StaticRouter"], {
    context: context,
    location: req.url,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_App__WEBPACK_IMPORTED_MODULE_0__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28,
      columnNumber: 9
    }
  })));

  if (context.url) {
    res.redirect(context.url);
  } else {
    res.status(200).send("<!doctype html>\n    <html lang=\"\">\n    <head>\n        <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n        <meta charset=\"utf-8\" />\n        <title>Chunky Soap Company</title>\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n        ".concat(assets.client.css ? "<link rel=\"stylesheet\" href=\"".concat(assets.client.css, "\">") : '', "\n        ").concat( false ? undefined : "<script src=\"".concat(assets.client.js, "\" defer crossorigin></script>"), "\n    </head>\n    <body>\n        <div id=\"root\">").concat(markup, "</div>\n    </body>\n</html>"));
  }
});
/* harmony default export */ __webpack_exports__["default"] = (server);

/***/ }),

/***/ "./src/styles/components/button.js":
/*!*****************************************!*\
  !*** ./src/styles/components/button.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _variables__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../variables */ "./src/styles/variables.js");


function _templateObject10() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n        background-color: ", "\n    "]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n        background-color: ", ";\n    "]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n        background-color: ", "\n    "]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n        opacity: 0.3;\n        "]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n        font-size: 18px;\n        font-weight: 400;\n        & .button-content {\n            height: 70px;\n            transition: all 0.1s ease-in;\n            display: flex;\n            flex-direction: column;\n            justify-content: space-between;\n            transform: translateY(3px);\n        }\n        & .button-content >* {\n            font-weight: 400;\n            font-size: 18px;\n        }\n\n        &:hover .button-content {\n            transform: translateY(-39px);\n        }\n        "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n        font-size: 24px;\n        font-weight: 500;\n        & .button-content {\n            height: 70px;\n            transition: all 0.1s ease-in;\n            display: flex;\n            flex-direction: column;\n            justify-content: space-between;\n            transform: translateY(1px);\n        }\n        & .button-content >* {\n            font-weight: 600;\n            font-size: 20px;\n        }\n\n        &:hover .button-content {\n            transform: translateY(-39px);\n        }\n        "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n            min-height: 62px;\n            min-width: 240px;\n            border-radius: 0px 50px 50px 0px;\n            padding: 5px 20px;\n            transition: all 0.5s ease-in;\n            &:hover {\n                background-color: ", ";\n            }\n            &:hover .button-content {\n                transform: translateY(5px);\n            }\n        "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n        font-size: 28px;\n        min-height: 50px;\n        font-weight: 600;\n        padding: 8px 50px;\n        & .button-content {\n            height: 70px;\n            transition: all 0.1s ease-in;\n            display: flex;\n            flex-direction: column;\n            justify-content: space-between;\n            transform: translateY(5px);\n        }\n        & .button-content >* {\n            font-weight: 600;\n            font-size: 20px;\n        }\n\n        &:hover .button-content {\n            transform: translateY(-37px);\n        }\n\n        "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n        min-width: 190px;\n        max-height: 42px;\n        "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n    position: relative;\n    padding: 8px 25px;\n    border-radius: 50px;\n    background-color: ", ";\n    border: none;\n    color: white;\n    font-weight: 400;\n    cursor: pointer;\n    z-index: 1000;\n    overflow: hidden;\n    margin: 0px 10px;\n    & .button-content >* {\n        font-weight: 400;\n        font-size: 18px;\n    }\n    ", "\n    ", "\n        ", "\n    ", "\n    ", "\n    ", "\n    ", "\n    ", "\n    ", "\n    ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}



var WxButton = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.button(_templateObject(), _variables__WEBPACK_IMPORTED_MODULE_2__["palette"].colorGray10, function (props) {
  return props.fixed && Object(styled_components__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject2());
}, function (props) {
  return props.big && Object(styled_components__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject3());
}, function (props) {
  return props.xl && Object(styled_components__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject4(), _variables__WEBPACK_IMPORTED_MODULE_2__["palette"].secondaryColor1);
}, function (props) {
  return props.med && Object(styled_components__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject5());
}, function (props) {
  return props.sml && Object(styled_components__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject6());
}, function (props) {
  return props.disabled && Object(styled_components__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject7());
}, function (props) {
  return props.primary && Object(styled_components__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject8(), _variables__WEBPACK_IMPORTED_MODULE_2__["palette"].secondayColor);
}, function (props) {
  return props.secondary && Object(styled_components__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject9(), _variables__WEBPACK_IMPORTED_MODULE_2__["palette"].primaryColor);
}, function (props) {
  return props.tertiary && Object(styled_components__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject10(), _variables__WEBPACK_IMPORTED_MODULE_2__["palette"].tertiaryColor);
}, ''
/* &:hover .button-content {
transition: all 0.1s ease-in-out;
} */
);
/* harmony default export */ __webpack_exports__["default"] = (WxButton);

/***/ }),

/***/ "./src/styles/components/topnav.js":
/*!*****************************************!*\
  !*** ./src/styles/components/topnav.js ***!
  \*****************************************/
/*! exports provided: NavList, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavList", function() { return NavList; });
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _variables__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../variables */ "./src/styles/variables.js");


function _templateObject2() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n    display: flex;\n    align-items: center;\n    justify-content: space-around;\n    list-style: none;\n    width: 70%;\n\n    li > a {\n        text-decoration: none;\n        color: ", ";\n    }\n\n    .active {\n        color: red;\n    }\n\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n    width: 80%;\n    margin: 0px auto;\n    height: 90px;\n    background-color: white;\n    display: flex;\n    justify-content: space-around;\n    align-items: center;\n    ", "\n    ", "\n    \n    \n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}



var TopNav = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div(_templateObject(), function (props) {
  return /product|checkout/.test(props.location) && " \n        background-color: ".concat(_variables__WEBPACK_IMPORTED_MODULE_2__["palette"].primaryColor, ";\n    ");
}, function (props) {
  return /checkout/.test(props.location) && " \n        margin-top: -100px;\n    ";
});
var NavList = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.ul(_templateObject2(), _variables__WEBPACK_IMPORTED_MODULE_2__["palette"].darkfont);
/* harmony default export */ __webpack_exports__["default"] = (TopNav);

/***/ }),

/***/ "./src/styles/global.css":
/*!*******************************!*\
  !*** ./src/styles/global.css ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Exports
module.exports = {};


/***/ }),

/***/ "./src/styles/layout.js":
/*!******************************!*\
  !*** ./src/styles/layout.js ***!
  \******************************/
/*! exports provided: Container, Section, Wrapper, Hero, SlideGrid, Frame, FrameHeader, FrameBody, FrameFooter, ButtonRow, Divider, Invoice, Logo, Address, ProductName, ProductQty, ProductTotal, Footer, FooterTotal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Container", function() { return Container; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Section", function() { return Section; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Wrapper", function() { return Wrapper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Hero", function() { return Hero; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SlideGrid", function() { return SlideGrid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Frame", function() { return Frame; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FrameHeader", function() { return FrameHeader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FrameBody", function() { return FrameBody; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FrameFooter", function() { return FrameFooter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ButtonRow", function() { return ButtonRow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Divider", function() { return Divider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Invoice", function() { return Invoice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Logo", function() { return Logo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Address", function() { return Address; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductName", function() { return ProductName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductQty", function() { return ProductQty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductTotal", function() { return ProductTotal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Footer", function() { return Footer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterTotal", function() { return FooterTotal; });
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _variables__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./variables */ "./src/styles/variables.js");


function _templateObject27() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()([" grid-area: 3 / 4 / 4 / 5; padding: 20px 20px; "]);

  _templateObject27 = function _templateObject27() {
    return data;
  };

  return data;
}

function _templateObject26() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()([" grid-area: footer;\n                border-top: 1px solid #333;\n                padding: 20px;\n"]);

  _templateObject26 = function _templateObject26() {
    return data;
  };

  return data;
}

function _templateObject25() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()([" grid-area: product_total; padding: 50px 20px;"]);

  _templateObject25 = function _templateObject25() {
    return data;
  };

  return data;
}

function _templateObject24() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["grid-area: product_qty; padding: 50px 20px;"]);

  _templateObject24 = function _templateObject24() {
    return data;
  };

  return data;
}

function _templateObject23() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()([" padding: 50px 20px; grid-area: Product_name"]);

  _templateObject23 = function _templateObject23() {
    return data;
  };

  return data;
}

function _templateObject22() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n                grid-area: Address;\n                padding: 20px;\n                border-bottom: 1px solid #333;\n                "]);

  _templateObject22 = function _templateObject22() {
    return data;
  };

  return data;
}

function _templateObject21() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n                    grid-area: Logo;\n                    display: flex;\n                    flex-direction: row;\n                    padding: 0px 20px;\n                    border-bottom: 1px solid #333;\n                    "]);

  _templateObject21 = function _templateObject21() {
    return data;
  };

  return data;
}

function _templateObject20() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n     width: 591px;\n     height: 538px;\n     padding: 4px;\n     display: grid;\n     grid-template-columns: 1fr 1fr 1fr 1fr;\n     grid-template-rows: 0.3fr 1.6fr 0.6fr 1fr;\n     gap: 0px 0px;\n     grid-template-areas:\n    \"Logo Logo Address Address\"\n    \"Product_name Product_name product_qty product_total\"\n    \"footer footer footer footer\";\n"]);

  _templateObject20 = function _templateObject20() {
    return data;
  };

  return data;
}

function _templateObject19() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n        margin-bottom: ", ";\n    "]);

  _templateObject19 = function _templateObject19() {
    return data;
  };

  return data;
}

function _templateObject18() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n    width: 100%;\n    height: 1px;\n    background-color: ", ";\n    ", "\n"]);

  _templateObject18 = function _templateObject18() {
    return data;
  };

  return data;
}

function _templateObject17() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n    margin-top: 20px;\n    display: flex;\n    flex-direction: row;\n    justify-content: flex-end;\n    float: right;\n    width: 100%;\n"]);

  _templateObject17 = function _templateObject17() {
    return data;
  };

  return data;
}

function _templateObject16() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n    flex: 0.5;\n    height: 70px;\n    ", "\n    display: flex;\n    justify-content: space-between;\n    margin-top: 30px;\n    padding: 20px 0px;\n    border-top: 1px solid ", ";\n"]);

  _templateObject16 = function _templateObject16() {
    return data;
  };

  return data;
}

function _templateObject15() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n    flex: 6;\n"]);

  _templateObject15 = function _templateObject15() {
    return data;
  };

  return data;
}

function _templateObject14() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n        padding: 40px 0px;\n        flex: 1;\n"]);

  _templateObject14 = function _templateObject14() {
    return data;
  };

  return data;
}

function _templateObject13() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n    margin: 150px auto 50px auto;\n    max-width: 650px;\n    padding: 40px 50px;\n    border: 1px solid #DBDBDB;\n    border-radius: 25px;\n    min-height: 320px;\n    display: flex;\n    justify-content: space-between;\n    flex-direction: column;\n"]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n    position: relative;\n    max-width: 1294px;\n    margin: 0px auto;\n    padding: 140px 100px 90px 100px;\n    background-color: white;\n    display: flex;\n    flex-flow: row wrap;\n    justify-content: space-between;\n    overflowX: hidden;\n    z-index: 2;\n    background-color: transparent;\n    ", "\n    ", "\n"]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n    width: 100%;\n    height: 800px;\n    color: white;\n    overflow: hidden;\n    background-color: ", ";\n"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n    margin-top: ", "px;\n    "]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n        max-Width: ", "px;\n    "]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n    max-width: 1294px;\n    margin: 0px auto;\n    overflow: hidden;\n    ", "\n    ", "\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n      background-color: white;\n    "]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n      background-color: ", ";\n    "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n      height: ", "px;\n    "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n        padding: 0px 50px 50px 50px;\n        "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n    max-width: 100%;\n    background-color: ", ";\n    min-height: 0px;\n    padding: 50px 50px 50px 50px;\n    overflowX: hidden;\n    z-index: -1;\n    ", "\n    ", "\n    ", "\n    ", "\n    overflow: hidden;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n        max-width: 100%;\n        background-color: ", ";\n        "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  width: 100%;\n  margin-left: auto;\n  margin-right: auto;\n  overflowX: hidden;\n  position: relative;\n  ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}



var Container = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div(_templateObject(), function (props) {
  return props.location && /product|checkout/.test(props.location) && props.nav === true && Object(styled_components__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject2(), _variables__WEBPACK_IMPORTED_MODULE_2__["palette"].primaryColor);
});
var Section = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div(_templateObject3(), _variables__WEBPACK_IMPORTED_MODULE_2__["palette"].primaryColor, function (props) {
  return props.narrow && Object(styled_components__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject4());
}, function (props) {
  return props.height && Object(styled_components__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject5(), props.height);
}, function (props) {
  return props.dark && Object(styled_components__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject6(), _variables__WEBPACK_IMPORTED_MODULE_2__["palette"].primaryColor);
}, function (props) {
  return props.light && Object(styled_components__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject7());
});
var Wrapper = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div(_templateObject8(), function (props) {
  return props.width && Object(styled_components__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject9(), props.width);
}, function (props) {
  return props.mt && Object(styled_components__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject10(), props.mt);
});
var Hero = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div(_templateObject11(), _variables__WEBPACK_IMPORTED_MODULE_2__["palette"].primaryColor);
var SlideGrid = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div(_templateObject12(), function (props) {
  return props.dark && "\n        background-color: ".concat(_variables__WEBPACK_IMPORTED_MODULE_2__["palette"].primaryColor, ";\n    ");
}, function (props) {
  return props.mb && "\n        margin-bottom: ".concat(props.mb, ";\n    ");
});
var Frame = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div(_templateObject13());
var FrameHeader = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div(_templateObject14());
var FrameBody = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div(_templateObject15());
var FrameFooter = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div(_templateObject16(), ''
/* border-top: 1px gray solid; */
, _variables__WEBPACK_IMPORTED_MODULE_2__["palette"].colorGray7);
var ButtonRow = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div(_templateObject17());
var Divider = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div(_templateObject18(), _variables__WEBPACK_IMPORTED_MODULE_2__["palette"].colorGray7, function (props) {
  return props.mb && Object(styled_components__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject19(), props.mb);
});
var Invoice = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div(_templateObject20());
var Logo = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div(_templateObject21());
var Address = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div(_templateObject22());
var ProductName = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div(_templateObject23());
var ProductQty = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div(_templateObject24());
var ProductTotal = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div(_templateObject25());
var Footer = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div(_templateObject26());
var FooterTotal = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div(_templateObject27());

/***/ }),

/***/ "./src/styles/logos.js":
/*!*****************************!*\
  !*** ./src/styles/logos.js ***!
  \*****************************/
/*! exports provided: Logo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Logo", function() { return Logo; });
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);


function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n    font-size: 20px;\n    letter-spacing: 2px;\n    width: 20%;\n    margin-left: 10px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}


var Logo = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div(_templateObject());

/***/ }),

/***/ "./src/styles/typography.js":
/*!**********************************!*\
  !*** ./src/styles/typography.js ***!
  \**********************************/
/*! exports provided: SectionHeading, BannerHeading, BannerHeading2, Heading1, Heading2, Heading3, SubHeading1, Paragraph */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SectionHeading", function() { return SectionHeading; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BannerHeading", function() { return BannerHeading; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BannerHeading2", function() { return BannerHeading2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Heading1", function() { return Heading1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Heading2", function() { return Heading2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Heading3", function() { return Heading3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubHeading1", function() { return SubHeading1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Paragraph", function() { return Paragraph; });
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _variables__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./variables */ "./src/styles/variables.js");


function _templateObject15() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n            font-weight: 600;\n            margin-bottom: 10px;\n    "]);

  _templateObject15 = function _templateObject15() {
    return data;
  };

  return data;
}

function _templateObject14() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n            color: red;\n    "]);

  _templateObject14 = function _templateObject14() {
    return data;
  };

  return data;
}

function _templateObject13() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n        font-size: 24px;\n        color: ", ";\n        font-weight: 600;\n    "]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n    font-size: 20px;\n    font-weight: 400;\n    margin-bottom: 20px;\n    margin-top: 20px;\n    font-style: italic;\n    ", "\n    ", "\n    color: ", ";\n    ", "\n    ", "\n    ", "\n"]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n    font-size: 28px;\n    font-weight: 400;\n    margin-bottom: 15px;\n    color: ", ";\n"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n        color: white;\n    "]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n    font-size: 22.9px;\n    font-weight: 600;\n    margin-bottom: 5px;\n    color: ", ";\n    ", "\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n        color: ", ";\n    "]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n    font-size: 28.6px;\n    ", "\n    font-weight: 400;\n    margin-bottom: 5px;\n    color: ", ";\n    ", "\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n        color: white;\n    "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n    font-size: 48.9px;\n    font-weight: 600;\n    margin-bottom: 5px;\n    color: ", ";\n    ", "\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n    font-size: 32px;\n    color: white;\n    font-weight: 400;\n    line-height: 200%;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n    margin-top: 50px;\n    text-align: left;\n    font-size: 58px;\n    font-weight: 600;\n    color: white;\n    line-height: 100%;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n        color: white;\n        background-color: ", ";\n        padding-top: 0px;\n        height: 19px;\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n    text-align: center;\n    padding-top: 40px;\n    height: 45.2px;\n    font-size: 48px;\n    font-weight: 400;\n    color: ", ";\n    background-color: white;\n    z-index: 21000;\n    ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}



var SectionHeading = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.h1(_templateObject(), _variables__WEBPACK_IMPORTED_MODULE_2__["palette"].colorGray4, function (props) {
  return props.light && Object(styled_components__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject2(), _variables__WEBPACK_IMPORTED_MODULE_2__["palette"].primaryColor);
});
var BannerHeading = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.h1(_templateObject3());
var BannerHeading2 = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.h3(_templateObject4());
var Heading1 = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.h1(_templateObject5(), _variables__WEBPACK_IMPORTED_MODULE_2__["palette"].colorGray3, function (props) {
  return props.light && Object(styled_components__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject6());
});
var Heading2 = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.h2(_templateObject7(), ''
/* line-height: 20px; */
, _variables__WEBPACK_IMPORTED_MODULE_2__["palette"].colorGray4, function (props) {
  return props.dark && Object(styled_components__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject8(), _variables__WEBPACK_IMPORTED_MODULE_2__["palette"].colorGray1);
});
var Heading3 = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.h1(_templateObject9(), _variables__WEBPACK_IMPORTED_MODULE_2__["palette"].colorGray3, function (props) {
  return props.light && Object(styled_components__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject10());
});
var SubHeading1 = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.h3(_templateObject11(), _variables__WEBPACK_IMPORTED_MODULE_2__["palette"].colorGray6);
var Paragraph = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.p(_templateObject12(), function (props) {
  return props.sml && "\n        font-size: 16px;\n        margin-bottom: 5px;\n        margin-top: 5px;\n    ";
}, function (props) {
  return props.centered && "\n        text-align: center;\n    ";
}, _variables__WEBPACK_IMPORTED_MODULE_2__["palette"].colorGray3, function (props) {
  return props.big && Object(styled_components__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject13(), _variables__WEBPACK_IMPORTED_MODULE_2__["palette"].colorGray4);
}, function (props) {
  return props.danger && Object(styled_components__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject14());
}, function (props) {
  return props.heavy && Object(styled_components__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject15());
});

/***/ }),

/***/ "./src/styles/ui/basket.js":
/*!*********************************!*\
  !*** ./src/styles/ui/basket.js ***!
  \*********************************/
/*! exports provided: ProductRow, Divider, BasketWrapper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductRow", function() { return ProductRow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Divider", function() { return Divider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BasketWrapper", function() { return BasketWrapper; });
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _variables__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../variables */ "./src/styles/variables.js");


function _templateObject5() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n    margin-top: 50px;\n    margin-left: auto;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n        margin-bottom: ", ";\n    "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n    width: 100%;\n    height: 1px;\n    background-color: ", ";\n    ", "\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n        padding: 10px 10%;\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n    margin: 0px 20px;\n    padding: 20px;\n    display: flex;\n    justify-content: flex-end;\n    align-items: center;\n    align-content: center;\n    flex-gap: 10px; \n    ", "\n    ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}



var ProductRow = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div(_templateObject(), function (props) {
  return props.narrow && Object(styled_components__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject2());
}, ''
/* border: 1px red solid; */
);
var Divider = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div(_templateObject3(), _variables__WEBPACK_IMPORTED_MODULE_2__["palette"].colorGray7, function (props) {
  return props.mb && Object(styled_components__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject4(), props.mb);
});
var BasketWrapper = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div(_templateObject5());

/***/ }),

/***/ "./src/styles/ui/bubble.js":
/*!*********************************!*\
  !*** ./src/styles/ui/bubble.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_variables__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../styles/variables */ "./src/styles/variables.js");


function _templateObject7() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n        width: ", "px;\n        height: ", "px;\n    "]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n        opacity: ", ";\n    "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n         transform: translateX(", "px);\n    "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n        transform: translateY(", ");\n    "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n        top: ", "px;\n    "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n        background-color: ", ";\n        ", "\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n    height: 100px;\n    width: 100px;\n    border-radius: 50%;\n    background-color: white;\n    opacity: 0.5;\n    position: absolute;\n    z-index: 1;\n    ", "\n    ", "\n    ", "\n    ", "\n    ", "\n    ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}



var Bubble = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div(_templateObject(), function (props) {
  return props.dark && Object(styled_components__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject2(), _styles_variables__WEBPACK_IMPORTED_MODULE_2__["palette"].primaryColor1, ''
  /* background-color: red; */
  );
}, function (props) {
  return props.t && Object(styled_components__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject3(), props.t);
}, function (props) {
  return props.y && Object(styled_components__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject4(), props.y);
}, function (props) {
  return props.x && Object(styled_components__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject5(), props.x);
}, function (props) {
  return props.opac && Object(styled_components__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject6(), props.opac);
}, function (props) {
  return props.size && Object(styled_components__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject7(), props.size, props.size);
});
/* harmony default export */ __webpack_exports__["default"] = (Bubble);

/***/ }),

/***/ "./src/styles/ui/categoryFrame.js":
/*!****************************************!*\
  !*** ./src/styles/ui/categoryFrame.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);


function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n    z-index: 100000;\n    position: relative;\n    width: 300px;\n    height: 300px;\n    border: 12px solid white;\n    border-radius: 75px;\n    background-color: green;\n    transform: rotate(-10deg) translateY(-300px);\n    background-color: #CCEAE3;\n    margin-left: 100px;\n    cursor: pointer;\n    text-align:center;\n    transition: all 0.2s ease-in;\n        &:hover {\n            transform: rotate(-10deg) translateY(-300px) scale(1.03);\n        }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}


var CategoryFrame = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div(_templateObject());
/* harmony default export */ __webpack_exports__["default"] = (CategoryFrame);

/***/ }),

/***/ "./src/styles/ui/dropMenu.js":
/*!***********************************!*\
  !*** ./src/styles/ui/dropMenu.js ***!
  \***********************************/
/*! exports provided: CategoryMenu, Pointer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoryMenu", function() { return CategoryMenu; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Pointer", function() { return Pointer; });
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _variables__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../variables */ "./src/styles/variables.js");


function _templateObject2() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n    width: 20px;\n    height: 20px;\n    z-index: 2000;\n    ", "\n    background-color: ", ";\n    margin-left: 53%;\n    margin-top: -25px;\n    transform: rotate(45deg);\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n    max-width: 400px;\n    ", "\n    ", "\n    background-color: ", ";\n    z-index: 3000;\n    position: absolute;\n    top: 60px;\n    border-radius: 20px;\n    box-shadow: 4px 4px 12px rgba(0,0,0, 0.2);\n    transform: translateX(-150px);\n    color: white;\n    padding: 20px 20px;\n    & ul {\n        list-style: none;\n        margin-left: 20px;\n        display: flex;\n        flex-direction: row;\n        max-width: 90%;\n        justify-content: space-between;\n        flex-flow: wrap;\n    }\n\n    & ul > li {\n        font-size: 24px;\n        margin-right: 10px;\n    }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}



var CategoryMenu = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div(_templateObject(), ''
/* height: 100px; */
, ''
/* background-color: white; */
, _variables__WEBPACK_IMPORTED_MODULE_2__["palette"].secondayColor);
var Pointer = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div(_templateObject2(), ''
/* background-color: white; */
, _variables__WEBPACK_IMPORTED_MODULE_2__["palette"].secondayColor);

/***/ }),

/***/ "./src/styles/ui/index.js":
/*!********************************!*\
  !*** ./src/styles/ui/index.js ***!
  \********************************/
/*! exports provided: Bubble, ProductFrame, Step, TextInput, LinkButton, CategoryFrame */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _bubble__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bubble */ "./src/styles/ui/bubble.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Bubble", function() { return _bubble__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _productFrame__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./productFrame */ "./src/styles/ui/productFrame.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ProductFrame", function() { return _productFrame__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _step__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./step */ "./src/styles/ui/step.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Step", function() { return _step__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _textInput__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./textInput */ "./src/styles/ui/textInput.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TextInput", function() { return _textInput__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _linkButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./linkButton */ "./src/styles/ui/linkButton.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LinkButton", function() { return _linkButton__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _categoryFrame__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./categoryFrame */ "./src/styles/ui/categoryFrame.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CategoryFrame", function() { return _categoryFrame__WEBPACK_IMPORTED_MODULE_5__["default"]; });








/***/ }),

/***/ "./src/styles/ui/linkButton.js":
/*!*************************************!*\
  !*** ./src/styles/ui/linkButton.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);


function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\nbackground: none!important;\nborder: none;\npadding: 0!important;\ncolor: #069;\ntext-decoration: underline;\ncursor: pointer;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}


var LinkButton = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.button(_templateObject());
/* harmony default export */ __webpack_exports__["default"] = (LinkButton);

/***/ }),

/***/ "./src/styles/ui/productFrame.js":
/*!***************************************!*\
  !*** ./src/styles/ui/productFrame.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);


function _templateObject2() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n      height: 70px;\n      max-width: 70px;\n      min-width: 70px;\n      border-radius: 15px\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  &, :after { \n    ", "\n    height: 330px;\n    width: 360px;\n    min-width: 360px;\n    border-radius: 80px;\n    background-color: #CCEAE3;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    cursor: pointer;\n    z-index: 7;\n    transition: all 0.2s ease-in;\n    position: relative;\n    ", "\n   }\n    &::after {\n        content:''; \n        transform: rotate(20deg);\n         z-index: -10;\n         position: absolute;\n         opacity: 0.3;\n         transition: all .5s ease-in;\n         box-shadow: rgba(149, 220, 203, 0.2) 0px 2px 13px, inset rgba(149, 220, 203, 0.2) 0px -1px 12px;\n    }\n    &:hover {\n        transform: rotate(-4deg);\n    }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}


var ProductFrame = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div(_templateObject(), ''
/* margin-top: 20px; */
, function (props) {
  return props.sml && Object(styled_components__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject2());
});
/* harmony default export */ __webpack_exports__["default"] = (ProductFrame);

/***/ }),

/***/ "./src/styles/ui/step.js":
/*!*******************************!*\
  !*** ./src/styles/ui/step.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _variables__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../variables */ "./src/styles/variables.js");


function _templateObject4() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n            background-color: ", ";\n            }\n            "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n            width: 0px;\n           "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n            background-color: ", ";\n           "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n&{\n        height: 36px;\n        width: 36px;\n        border-radius: 50%;\n        background-color: ", ";\n        position: relative;\n        display: inline-block;\n        margin-right: 150px;\n        flex-shrink: 4;\n        ", "\n        }\n}\n    &::before {\n        content: '';\n        position: absolute;\n        border-radius: 50%;\n        border: 3px solid white;\n        width: 22px;\n        height: 22px;\n        top: 4px;\n        left: 4px;\n    }\n    &::after {\n        content: '';\n        width: 150px;\n        height: 3px;\n        background-color: ", ";\n        position: absolute;\n        transform: translate(-168px, 15px);\n\n        ", "\n\n        ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}



var Step = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div(_templateObject(), _variables__WEBPACK_IMPORTED_MODULE_2__["palette"].colorGray6, function (props) {
  return props.step >= props.number && Object(styled_components__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject2(), _variables__WEBPACK_IMPORTED_MODULE_2__["palette"].primaryColor);
}, _variables__WEBPACK_IMPORTED_MODULE_2__["palette"].colorGray6, function (props) {
  return props.number === 1 && Object(styled_components__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject3());
}, function (props) {
  return props.step >= props.number && Object(styled_components__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject4(), _variables__WEBPACK_IMPORTED_MODULE_2__["palette"].primaryColor);
});
/* harmony default export */ __webpack_exports__["default"] = (Step);

/***/ }),

/***/ "./src/styles/ui/textInput.js":
/*!************************************!*\
  !*** ./src/styles/ui/textInput.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _variables__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../variables */ "./src/styles/variables.js");


function _templateObject5() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n        height: 62px;\n        font-size: 28px;\n        ::placeholder {\n            color: ", ";\n        }\n    "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n        height: 48px;\n        color: orange;\n    "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n        height: 50px;\n    "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n        width: 100%; \n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n    height: 50px;\n    max-width: 100%;\n    display: inline-block;\n    border: none;\n    border-radius: 50px;\n    z-index: 1000;\n    background-color: ", ";\n    color: ", ";\n    padding: 0px 50px;\n    margin: 0px 5px 10px 0px;\n    ", "\n    ", "\n    ", "\n    ", " \n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}



var TextInput = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.input(_templateObject(), _variables__WEBPACK_IMPORTED_MODULE_2__["palette"].colorGray8, _variables__WEBPACK_IMPORTED_MODULE_2__["palette"].colorGray4, function (props) {
  return props.inline && Object(styled_components__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject2());
}, function (props) {
  return props.withButton && Object(styled_components__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject3());
}, function (props) {
  return props.valid === false && Object(styled_components__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject4());
}, function (props) {
  return props.big && Object(styled_components__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject5(), _variables__WEBPACK_IMPORTED_MODULE_2__["palette"].colorGray10);
});
/* harmony default export */ __webpack_exports__["default"] = (TextInput);

/***/ }),

/***/ "./src/styles/variables.js":
/*!*********************************!*\
  !*** ./src/styles/variables.js ***!
  \*********************************/
/*! exports provided: palette, fonts, heroBubbles, headerBubbles, bodyBubbles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "palette", function() { return palette; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fonts", function() { return fonts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "heroBubbles", function() { return heroBubbles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "headerBubbles", function() { return headerBubbles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bodyBubbles", function() { return bodyBubbles; });
var palette = {
  primaryColor: '#95DCCB',
  primaryColor1: '#79CBB7',
  secondayColor: '#F19AFF',
  secondaryColor1: '#E963FF',
  tertiaryColor1: '#61E1FF',
  tertiaryColor: '#77E5FF',
  darkfont: '#1E1C1C',
  colorGray1: '#0D0D0D',
  colorGray2: '#1E1C1C',
  colorGray3: '#535151',
  colorGray4: '#837D7D',
  colorGray5: '#A3A3A3',
  colorGray6: '#C2C1C1',
  colorGray7: '#DBDBDB',
  colorGray8: '#F7F2F2',
  colorGray9: '#FBFAFA',
  colorGray10: '#C4C4C4',
  gray1: '#F6F2F2'
};
var fonts = {
  small: '22px'
}; // export default vars

var heroBubbles = [{
  size: 230,
  opac: 0.6,
  x: 10,
  t: 500
}, {
  size: 170,
  opac: 0.4,
  x: 200,
  t: 680
}, {
  size: 190,
  opac: 0.2,
  x: 1160,
  t: 530
}, {
  size: 120,
  opac: 0.3,
  x: 800,
  t: 690
}, {
  size: 60,
  opac: 0.2,
  x: 920,
  t: 790
}, {
  size: 50,
  opac: 0.7,
  x: 80,
  t: 900,
  dark: 'yes'
}, {
  size: 120,
  opac: 0.7,
  x: 160,
  t: 950,
  dark: 'yes'
}];
var headerBubbles = [{
  size: 30,
  opac: 0.2,
  x: 290,
  t: 310
}, {
  size: 90,
  opac: 0.4,
  x: 350,
  t: 320
}, {
  size: 60,
  opac: 0.2,
  x: 850,
  t: 130
}, {
  size: 120,
  opac: 0.2,
  x: 750,
  t: 190
}, {
  size: 30,
  opac: 0.2,
  x: 910,
  t: 230
}, {
  size: 120,
  opac: 0.2,
  x: 990,
  t: 320
}, {
  size: 30,
  opac: 0.2,
  x: 380,
  t: 390,
  dark: 'yes'
}, {
  size: 100,
  opac: 0.1,
  x: 260,
  t: 400,
  dark: 'yes'
}];
var bodyBubbles = [{
  size: 30,
  opac: 0.2,
  x: 290,
  t: 1110,
  dark: 'yes'
}, {
  size: 90,
  opac: 0.2,
  x: 350,
  t: 1120,
  dark: 'yes'
}, {
  size: 60,
  opac: 0.2,
  x: 850,
  t: 1030,
  dark: 'yes'
}, {
  size: 120,
  opac: 0.2,
  x: 750,
  t: 1090,
  dark: 'yes'
}, {
  size: 30,
  opac: 0.4,
  x: 910,
  t: 1130,
  dark: 'yes'
}, {
  size: 120,
  opac: 0.2,
  x: 990,
  t: 1220,
  dark: 'yes'
}, {
  size: 40,
  opac: 0.4,
  x: 210,
  t: 1260,
  dark: 'yes'
}, {
  size: 120,
  opac: 0.2,
  x: 260,
  t: 1300,
  dark: 'yes'
}, {
  size: 120,
  opac: 0.2,
  x: 1290,
  t: 1020,
  dark: 'yes'
}, {
  size: 40,
  opac: 0.4,
  x: 1210,
  t: 1260,
  dark: 'yes'
}, {
  size: 60,
  opac: 0.2,
  x: 1400,
  t: 1300,
  dark: 'yes'
}, {
  size: 30,
  opac: 0.2,
  x: 350,
  t: 1520,
  dark: 'yes'
}, {
  size: 30,
  opac: 0.2,
  x: 290,
  t: 1910,
  dark: 'yes'
}, {
  size: 90,
  opac: 0.2,
  x: 350,
  t: 1920,
  dark: 'yes'
}, {
  size: 60,
  opac: 0.2,
  x: 850,
  t: 1830,
  dark: 'yes'
}, {
  size: 120,
  opac: 0.2,
  x: 750,
  t: 1890,
  dark: 'yes'
}, {
  size: 30,
  opac: 0.4,
  x: 910,
  t: 1930,
  dark: 'yes'
}, {
  size: 120,
  opac: 0.2,
  x: 990,
  t: 1920,
  dark: 'yes'
}, {
  size: 40,
  opac: 0.4,
  x: 210,
  t: 1960,
  dark: 'yes'
}, {
  size: 120,
  opac: 0.2,
  x: 260,
  t: 2100,
  dark: 'yes'
}, {
  size: 120,
  opac: 0.2,
  x: 1290,
  t: 1820,
  dark: 'yes'
}, {
  size: 40,
  opac: 0.4,
  x: 1210,
  t: 2060,
  dark: 'yes'
}, {
  size: 60,
  opac: 0.2,
  x: 1400,
  t: 2000,
  dark: 'yes'
}, {
  size: 30,
  opac: 0.2,
  x: 350,
  t: 2320,
  dark: 'yes'
}];

/***/ }),

/***/ 0:
/*!**************************************************************************!*\
  !*** multi razzle-dev-utils/prettyNodeErrors webpack/hot/poll?300 ./src ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! razzle-dev-utils/prettyNodeErrors */"razzle-dev-utils/prettyNodeErrors");
__webpack_require__(/*! webpack/hot/poll?300 */"./node_modules/webpack/hot/poll.js?300");
module.exports = __webpack_require__(/*! /home/webnostix/Codebase/ChunkySoap2021/client/src */"./src/index.js");


/***/ }),

/***/ "@babel/runtime/helpers/asyncToGenerator":
/*!**********************************************************!*\
  !*** external "@babel/runtime/helpers/asyncToGenerator" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/asyncToGenerator");

/***/ }),

/***/ "@babel/runtime/helpers/classCallCheck":
/*!********************************************************!*\
  !*** external "@babel/runtime/helpers/classCallCheck" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/classCallCheck");

/***/ }),

/***/ "@babel/runtime/helpers/createClass":
/*!*****************************************************!*\
  !*** external "@babel/runtime/helpers/createClass" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/createClass");

/***/ }),

/***/ "@babel/runtime/helpers/defineProperty":
/*!********************************************************!*\
  !*** external "@babel/runtime/helpers/defineProperty" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/defineProperty");

/***/ }),

/***/ "@babel/runtime/helpers/extends":
/*!*************************************************!*\
  !*** external "@babel/runtime/helpers/extends" ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/extends");

/***/ }),

/***/ "@babel/runtime/helpers/getPrototypeOf":
/*!********************************************************!*\
  !*** external "@babel/runtime/helpers/getPrototypeOf" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/getPrototypeOf");

/***/ }),

/***/ "@babel/runtime/helpers/inherits":
/*!**************************************************!*\
  !*** external "@babel/runtime/helpers/inherits" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/inherits");

/***/ }),

/***/ "@babel/runtime/helpers/objectWithoutProperties":
/*!*****************************************************************!*\
  !*** external "@babel/runtime/helpers/objectWithoutProperties" ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/objectWithoutProperties");

/***/ }),

/***/ "@babel/runtime/helpers/possibleConstructorReturn":
/*!*******************************************************************!*\
  !*** external "@babel/runtime/helpers/possibleConstructorReturn" ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/possibleConstructorReturn");

/***/ }),

/***/ "@babel/runtime/helpers/slicedToArray":
/*!*******************************************************!*\
  !*** external "@babel/runtime/helpers/slicedToArray" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/slicedToArray");

/***/ }),

/***/ "@babel/runtime/helpers/taggedTemplateLiteral":
/*!***************************************************************!*\
  !*** external "@babel/runtime/helpers/taggedTemplateLiteral" ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/taggedTemplateLiteral");

/***/ }),

/***/ "@babel/runtime/helpers/toConsumableArray":
/*!***********************************************************!*\
  !*** external "@babel/runtime/helpers/toConsumableArray" ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/toConsumableArray");

/***/ }),

/***/ "@babel/runtime/regenerator":
/*!*********************************************!*\
  !*** external "@babel/runtime/regenerator" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/regenerator");

/***/ }),

/***/ "@stripe/react-stripe-js":
/*!******************************************!*\
  !*** external "@stripe/react-stripe-js" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@stripe/react-stripe-js");

/***/ }),

/***/ "@stripe/stripe-js":
/*!************************************!*\
  !*** external "@stripe/stripe-js" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@stripe/stripe-js");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "fuse.js":
/*!**************************!*\
  !*** external "fuse.js" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fuse.js");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "jspdf":
/*!************************!*\
  !*** external "jspdf" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("jspdf");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "promise-retry":
/*!********************************!*\
  !*** external "promise-retry" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("promise-retry");

/***/ }),

/***/ "razzle-dev-utils/prettyNodeErrors":
/*!****************************************************!*\
  !*** external "razzle-dev-utils/prettyNodeErrors" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("razzle-dev-utils/prettyNodeErrors");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),

/***/ "react-feather":
/*!********************************!*\
  !*** external "react-feather" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-feather");

/***/ }),

/***/ "react-loader-spinner":
/*!***************************************!*\
  !*** external "react-loader-spinner" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-loader-spinner");

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),

/***/ "react-router":
/*!*******************************!*\
  !*** external "react-router" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),

/***/ "redux":
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),

/***/ "stripe":
/*!*************************!*\
  !*** external "stripe" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("stripe");

/***/ }),

/***/ "styled-components":
/*!************************************!*\
  !*** external "styled-components" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ }),

/***/ "universal-cookie":
/*!***********************************!*\
  !*** external "universal-cookie" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("universal-cookie");

/***/ })

/******/ });
//# sourceMappingURL=server.js.map