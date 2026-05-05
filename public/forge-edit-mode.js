(function() {
  let editModeEnabled = false;
  let currentEditable = null;
  let originalText = '';

  const TEXT_TAGS = new Set([
    'H1','H2','H3','H4','H5','H6','P','SPAN','A','LI','TD','TH',
    'LABEL','BUTTON','FIGCAPTION','BLOCKQUOTE','CAPTION','DT','DD',
    'LEGEND','SUMMARY','EM','STRONG','B','I','U','S','SMALL','MARK',
    'CODE','PRE','ABBR','CITE','Q','TIME','SUB','SUP'
  ]);
  const CONTAINER_TAGS = new Set(['DIV','SECTION','ARTICLE','HEADER','FOOTER','MAIN','ASIDE','NAV']);

  function isTextElement(el) {
    if (TEXT_TAGS.has(el.tagName)) return true;
    if (CONTAINER_TAGS.has(el.tagName)) {
      for (const child of el.childNodes) {
        if (child.nodeType === 3 && child.textContent.trim().length > 0) return true;
      }
    }
    return false;
  }

  function addHighlightStyle() {
    if (document.getElementById('forge-edit-style')) return;
    const style = document.createElement('style');
    style.id = 'forge-edit-style';
    style.textContent = '[data-forge-editable]{outline:2px solid #3b82f6;outline-offset:2px;cursor:text;border-radius:2px;}';
    document.head.appendChild(style);
  }

  function removeHighlightStyle() {
    const style = document.getElementById('forge-edit-style');
    if (style) style.remove();
  }

  function commitEdit(el) {
    if (!el || !el.hasAttribute('contenteditable')) return;
    const newText = el.textContent.trim();
    el.removeAttribute('contenteditable');
    el.removeAttribute('data-forge-editing');
    if (newText && newText !== originalText) {
      window.parent.postMessage({ type: 'forge-text-edit', oldText: originalText, newText: newText }, '*');
    }
    currentEditable = null;
    originalText = '';
  }

  function cancelEdit(el) {
    if (!el) return;
    el.textContent = originalText;
    el.removeAttribute('contenteditable');
    el.removeAttribute('data-forge-editing');
    currentEditable = null;
    originalText = '';
  }

  function handleMouseOver(e) {
    if (!editModeEnabled) return;
    const el = e.target;
    if (el.hasAttribute('data-forge-editing')) return;
    if (isTextElement(el)) {
      el.setAttribute('data-forge-editable', '');
    }
  }

  function handleMouseOut(e) {
    if (!editModeEnabled) return;
    const el = e.target;
    if (el.hasAttribute('data-forge-editing')) return;
    el.removeAttribute('data-forge-editable');
  }

  function handleClick(e) {
    if (!editModeEnabled) return;
    e.preventDefault();
    e.stopPropagation();
    const el = e.target;
    if (!isTextElement(el)) return;
    if (el.hasAttribute('data-forge-editing')) return;
    if (currentEditable) commitEdit(currentEditable);
    originalText = el.textContent.trim();
    el.setAttribute('contenteditable', 'true');
    el.setAttribute('data-forge-editing', '');
    el.focus();
    const sel = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(el);
    sel.removeAllRanges();
    sel.addRange(range);
    currentEditable = el;
  }

  function handleKeyDown(e) {
    if (!currentEditable) return;
    e.stopPropagation();
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      commitEdit(currentEditable);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      cancelEdit(currentEditable);
    }
  }

  function handleBlur(e) {
    if (!currentEditable) return;
    if (e.target === currentEditable) {
      commitEdit(currentEditable);
    }
  }

  function enableEditMode() {
    editModeEnabled = true;
    addHighlightStyle();
    document.addEventListener('mouseover', handleMouseOver, true);
    document.addEventListener('mouseout', handleMouseOut, true);
    document.addEventListener('click', handleClick, true);
    document.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('blur', handleBlur, true);
  }

  function disableEditMode() {
    editModeEnabled = false;
    if (currentEditable) cancelEdit(currentEditable);
    removeHighlightStyle();
    document.querySelectorAll('[data-forge-editable]').forEach(function(el) {
      el.removeAttribute('data-forge-editable');
    });
    document.removeEventListener('mouseover', handleMouseOver, true);
    document.removeEventListener('mouseout', handleMouseOut, true);
    document.removeEventListener('click', handleClick, true);
    document.removeEventListener('keydown', handleKeyDown, true);
    document.removeEventListener('blur', handleBlur, true);
  }

  window.addEventListener('message', function(e) {
    if (e.data && e.data.type === 'forge-edit-mode-toggle') {
      if (e.data.enabled) enableEditMode();
      else disableEditMode();
    }
  });
})();
