"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = numericMenu;

var _preactCompat = _interopRequireWildcard(require("preact-compat"));

var _classnames = _interopRequireDefault(require("classnames"));

var _RefinementList = _interopRequireDefault(require("../../components/RefinementList/RefinementList"));

var _connectNumericMenu = _interopRequireDefault(require("../../connectors/numeric-menu/connectNumericMenu"));

var _defaultTemplates = _interopRequireDefault(require("./defaultTemplates"));

var _utils = require("../../lib/utils");

var _suit = require("../../lib/suit");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var withUsage = (0, _utils.createDocumentationMessageGenerator)({
  name: 'numeric-menu'
});
var suit = (0, _suit.component)('NumericMenu');

var renderer = function renderer(_ref) {
  var containerNode = _ref.containerNode,
      attribute = _ref.attribute,
      cssClasses = _ref.cssClasses,
      renderState = _ref.renderState,
      templates = _ref.templates;
  return function (_ref2, isFirstRendering) {
    var createURL = _ref2.createURL,
        instantSearchInstance = _ref2.instantSearchInstance,
        refine = _ref2.refine,
        items = _ref2.items;

    if (isFirstRendering) {
      renderState.templateProps = (0, _utils.prepareTemplateProps)({
        defaultTemplates: _defaultTemplates.default,
        templatesConfig: instantSearchInstance.templatesConfig,
        templates: templates
      });
      return;
    }

    (0, _preactCompat.render)(_preactCompat.default.createElement(_RefinementList.default, {
      createURL: createURL,
      cssClasses: cssClasses,
      facetValues: items,
      templateProps: renderState.templateProps,
      toggleRefinement: refine,
      attribute: attribute
    }), containerNode);
  };
};
/**
 * @typedef {Object} NumericMenuCSSClasses
 * @property {string|string[]} [root] CSS class to add to the root element.
 * @property {string|string[]} [noRefinementRoot] CSS class to add to the root element when no refinements.
 * @property {string|string[]} [list] CSS class to add to the list element.
 * @property {string|string[]} [item] CSS class to add to each item element.
 * @property {string|string[]} [selectedItem] CSS class to add to each selected item element.
 * @property {string|string[]} [label] CSS class to add to each label element.
 * @property {string|string[]} [labelText] CSS class to add to each label text element.
 * @property {string|string[]} [radio] CSS class to add to each radio element (when using the default template).
 */

/**
 * @typedef {Object} NumericMenuTemplates
 * @property {string|function} [item] Item template, provided with `label` (the name in the configuration), `isRefined`, `url`, `value` (the setting for the filter) data properties.
 */

/**
 * @typedef {Object} NumericMenuOption
 * @property {string} label Label of the option.
 * @property {number} [start] Low bound of the option (>=).
 * @property {number} [end] High bound of the option (<=).
 */

/**
 * @typedef {Object} NumericMenuWidgetOptions
 * @property {string|HTMLElement} container CSS Selector or HTMLElement to insert the widget.
 * @property {string} attribute Name of the attribute for filtering.
 * @property {NumericMenuOption[]} items List of all the items.
 * @property {NumericMenuTemplates} [templates] Templates to use for the widget.
 * @property {NumericMenuCSSClasses} [cssClasses] CSS classes to add to the wrapping elements.
 * @property {function(object[]):object[]} [transformItems] Function to transform the items passed to the templates.
 */

/**
 * The numeric menu is a widget that displays a list of numeric filters in a list. Those numeric filters
 * are pre-configured with creating the widget.
 *
 * @requirements
 * The attribute passed to `attribute` must be declared as an [attribute for faceting](https://www.algolia.com/doc/guides/searching/faceting/#declaring-attributes-for-faceting) in your
 * Algolia settings.
 *
 * The values inside this attribute must be JavaScript numbers and not strings.
 *
 * @type {WidgetFactory}
 * @devNovel NumericMenu
 * @category filter
 * @param {NumericMenuWidgetOptions} $0 The NumericMenu widget items
 * @return {Widget} Creates a new instance of the NumericMenu widget.
 * @example
 * search.addWidget(
 *   instantsearch.widgets.numericMenu({
 *     container: '#popularity',
 *     attribute: 'popularity',
 *     items: [
 *       { label: 'All' },
 *       { end: 500, label: 'less than 500' },
 *       { start: 500, end: 2000, label: 'between 500 and 2000' },
 *       { start: 2000, label: 'more than 2000' }
 *     ]
 *   })
 * );
 */


function numericMenu() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      container = _ref3.container,
      attribute = _ref3.attribute,
      items = _ref3.items,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses,
      _ref3$templates = _ref3.templates,
      templates = _ref3$templates === void 0 ? _defaultTemplates.default : _ref3$templates,
      transformItems = _ref3.transformItems;

  if (!container) {
    throw new Error(withUsage('The `container` option is required.'));
  }

  var containerNode = (0, _utils.getContainerNode)(container);
  var cssClasses = {
    root: (0, _classnames.default)(suit(), userCssClasses.root),
    noRefinementRoot: (0, _classnames.default)(suit({
      modifierName: 'noRefinement'
    }), userCssClasses.noRefinementRoot),
    list: (0, _classnames.default)(suit({
      descendantName: 'list'
    }), userCssClasses.list),
    item: (0, _classnames.default)(suit({
      descendantName: 'item'
    }), userCssClasses.item),
    selectedItem: (0, _classnames.default)(suit({
      descendantName: 'item',
      modifierName: 'selected'
    }), userCssClasses.selectedItem),
    label: (0, _classnames.default)(suit({
      descendantName: 'label'
    }), userCssClasses.label),
    radio: (0, _classnames.default)(suit({
      descendantName: 'radio'
    }), userCssClasses.radio),
    labelText: (0, _classnames.default)(suit({
      descendantName: 'labelText'
    }), userCssClasses.labelText)
  };
  var specializedRenderer = renderer({
    containerNode: containerNode,
    attribute: attribute,
    cssClasses: cssClasses,
    renderState: {},
    templates: templates
  });
  var makeNumericMenu = (0, _connectNumericMenu.default)(specializedRenderer, function () {
    return (0, _preactCompat.unmountComponentAtNode)(containerNode);
  });
  return makeNumericMenu({
    attribute: attribute,
    items: items,
    transformItems: transformItems
  });
}