/**
 * Valley Endodontics & Oral Surgery — Daily EOD Submission
 * JavaScript Logic for Header, Section 1: Location Information & Core Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('Daily EOD Submission Dashboard initialized.');

  // ==========================================================================
  // 1. SECTION 1: DEFAULT REPORTING DATE
  // ==========================================================================
  const eodDateInput = document.getElementById('eodDate');
  if (eodDateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    // Set native date input value (YYYY-MM-DD)
    eodDateInput.value = `${yyyy}-${mm}-${dd}`;
  }

  // ==========================================================================
  // 2. SAMPLE OFFICE & PHYSICIAN / PROVIDER DATASET
  // (Identified as sample demonstration data for UI demonstration)
  // ==========================================================================
  const SAMPLE_OFFICE_DATA = {
    'ahwatukee': {
      name: 'Ahwatukee (Sample Office)',
      manager: 'Karen Mitchell (Sample OM)',
      providers: [
        { id: 'p_ahw_1', name: 'Dr. Sarah Jenkins', specialty: 'Endodontist' },
        { id: 'p_ahw_2', name: 'Dr. Marcus Vance', specialty: 'Oral Surgeon' },
        { id: 'p_ahw_3', name: 'Dr. Emily Chen', specialty: 'Endodontist' }
      ]
    },
    'chandler': {
      name: 'Chandler (Sample Office)',
      manager: 'David Reynolds (Sample OM)',
      providers: [
        { id: 'p_chd_1', name: 'Dr. Robert Taylor', specialty: 'Oral Surgeon' },
        { id: 'p_chd_2', name: 'Dr. Jessica Adams', specialty: 'Endodontist' },
        { id: 'p_chd_3', name: 'Dr. Brian Lee', specialty: 'Oral Surgeon' }
      ]
    },
    'gilbert': {
      name: 'Gilbert (Sample Office)',
      manager: 'Lisa Hernandez (Sample OM)',
      providers: [
        { id: 'p_glb_1', name: 'Dr. Michael Chang', specialty: 'Oral Surgeon' },
        { id: 'p_glb_2', name: 'Dr. Amanda Brooks', specialty: 'Endodontist' },
        { id: 'p_glb_3', name: 'Dr. Rachel Garcia', specialty: 'Endodontist' }
      ]
    },
    'glendale': {
      name: 'Glendale (Sample Office)',
      manager: 'Thomas Moore (Sample OM)',
      providers: [
        { id: 'p_gld_1', name: 'Dr. Kevin Patel', specialty: 'Oral Surgeon' },
        { id: 'p_gld_2', name: 'Dr. Laura Martinez', specialty: 'Endodontist' }
      ]
    },
    'mesa': {
      name: 'Mesa (Sample Office)',
      manager: 'Patricia Wilson (Sample OM)',
      providers: [
        { id: 'p_msa_1', name: 'Dr. David Clark', specialty: 'Oral Surgeon' },
        { id: 'p_msa_2', name: 'Dr. Christopher Scott', specialty: 'Endodontist' },
        { id: 'p_msa_3', name: 'Dr. Nicole Turner', specialty: 'Oral Surgeon' }
      ]
    },
    'north-phoenix': {
      name: 'North Phoenix (Sample Office)',
      manager: 'James Anderson (Sample OM)',
      providers: [
        { id: 'p_npx_1', name: 'Dr. William Harris', specialty: 'Endodontist' },
        { id: 'p_npx_2', name: 'Dr. Stephanie White', specialty: 'Oral Surgeon' }
      ]
    },
    'scottsdale': {
      name: 'Scottsdale (Sample Office)',
      manager: 'Angela Davis (Sample OM)',
      providers: [
        { id: 'p_sct_1', name: 'Dr. Gregory Hall', specialty: 'Endodontist' },
        { id: 'p_sct_2', name: 'Dr. Samantha Bennett', specialty: 'Oral Surgeon' },
        { id: 'p_sct_3', name: 'Dr. Andrew Miller', specialty: 'Endodontist' }
      ]
    }
  };

  // ==========================================================================
  // 3. SECTION 1: LOCATION & PROVIDER MULTI-SELECT INTERACTION
  // ==========================================================================
  const officeLocationSelect = document.getElementById('officeLocation');
  const officeManagerInput = document.getElementById('officeManager');
  const providerMultiSelect = document.getElementById('providerMultiSelect');
  const workingProvidersTrigger = document.getElementById('workingProvidersTrigger');
  const providerDropdownMenu = document.getElementById('providerDropdownMenu');
  const providerSelectedText = document.getElementById('providerSelectedText');
  const providerOptionsList = document.getElementById('providerOptionsList');
  const providerSelectActions = document.getElementById('providerSelectActions');
  const btnSelectAllProviders = document.getElementById('btnSelectAllProviders');
  const btnClearProviders = document.getElementById('btnClearProviders');
  const hiddenWorkingProvidersSelect = document.getElementById('workingProviders');

  let currentOfficeProviders = [];
  let selectedProviderIds = new Set();

  // Populate providers when Office Location changes
  if (officeLocationSelect) {
    officeLocationSelect.addEventListener('change', () => {
      const selectedOfficeKey = officeLocationSelect.value;
      const officeData = SAMPLE_OFFICE_DATA[selectedOfficeKey];

      // Auto-suggest sample office manager name if currently empty or previously auto-filled
      if (officeData && officeManagerInput) {
        if (!officeManagerInput.value || officeManagerInput.dataset.autofilled === 'true') {
          officeManagerInput.value = officeData.manager;
          officeManagerInput.dataset.autofilled = 'true';
        }
      }

      // Reset selection set
      selectedProviderIds.clear();

      if (officeData && officeData.providers.length > 0) {
        currentOfficeProviders = officeData.providers;
        renderProviderOptions(currentOfficeProviders);
        if (providerSelectActions) providerSelectActions.style.display = 'flex';
      } else {
        currentOfficeProviders = [];
        if (providerOptionsList) {
          providerOptionsList.innerHTML = '<li class="multi-select-empty">No providers found for this location</li>';
        }
        if (providerSelectActions) providerSelectActions.style.display = 'none';
      }

      updateProviderTriggerDisplay();
      syncHiddenProviderSelect();
      updateCollectionsProviderOptions(currentOfficeProviders);
      updatePatientProviderOptions(currentOfficeProviders);
    });
  }

  // Allow user manual edit of office manager without re-overriding
  if (officeManagerInput) {
    officeManagerInput.addEventListener('input', () => {
      officeManagerInput.dataset.autofilled = 'false';
    });
  }

  // Render provider checkboxes in the dropdown
  function renderProviderOptions(providers) {
    if (!providerOptionsList) return;
    providerOptionsList.innerHTML = '';

    providers.forEach(provider => {
      const li = document.createElement('li');
      li.className = 'multi-select-option';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = `chk_${provider.id}`;
      checkbox.value = provider.id;
      checkbox.checked = selectedProviderIds.has(provider.id);

      const label = document.createElement('label');
      label.htmlFor = `chk_${provider.id}`;
      label.textContent = provider.name;
      label.style.flex = '1';
      label.style.cursor = 'pointer';

      const badge = document.createElement('span');
      badge.className = 'provider-specialty-badge';
      badge.textContent = provider.specialty;

      li.appendChild(checkbox);
      li.appendChild(label);
      li.appendChild(badge);

      // Handle item click
      li.addEventListener('click', (e) => {
        // If clicking label or li, toggle checkbox
        if (e.target !== checkbox) {
          checkbox.checked = !checkbox.checked;
        }
        handleProviderCheckChange(provider.id, checkbox.checked);
      });

      providerOptionsList.appendChild(li);
    });
  }

  function handleProviderCheckChange(providerId, isChecked) {
    if (isChecked) {
      selectedProviderIds.add(providerId);
    } else {
      selectedProviderIds.delete(providerId);
    }
    updateProviderTriggerDisplay();
    syncHiddenProviderSelect();
  }

  // Update button label / trigger text
  function updateProviderTriggerDisplay() {
    if (!providerSelectedText) return;

    if (selectedProviderIds.size === 0) {
      providerSelectedText.textContent = 'Select Provider(s)';
      providerSelectedText.classList.add('placeholder');
      providerSelectedText.title = 'Select Provider(s)';
    } else {
      const selectedNames = currentOfficeProviders
        .filter(p => selectedProviderIds.has(p.id))
        .map(p => p.name);

      providerSelectedText.classList.remove('placeholder');

      if (selectedNames.length <= 2) {
        const displayText = selectedNames.join(', ');
        providerSelectedText.textContent = displayText;
        providerSelectedText.title = displayText;
      } else {
        const displayText = `${selectedNames.length} Providers Selected`;
        providerSelectedText.textContent = displayText;
        providerSelectedText.title = selectedNames.join(', ');
      }
    }
  }

  // Synchronize with native hidden select for accessibility and semantic form serialization
  function syncHiddenProviderSelect() {
    if (!hiddenWorkingProvidersSelect) return;
    hiddenWorkingProvidersSelect.innerHTML = '';
    currentOfficeProviders.forEach(p => {
      const option = document.createElement('option');
      option.value = p.id;
      option.textContent = `${p.name} (${p.specialty})`;
      if (selectedProviderIds.has(p.id)) {
        option.selected = true;
      }
      hiddenWorkingProvidersSelect.appendChild(option);
    });
  }

  // Toggle Dropdown Menu Visibility
  if (workingProvidersTrigger && providerMultiSelect) {
    workingProvidersTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = providerMultiSelect.classList.toggle('open');
      workingProvidersTrigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    workingProvidersTrigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        providerMultiSelect.classList.add('open');
        workingProvidersTrigger.setAttribute('aria-expanded', 'true');
      } else if (e.key === 'Escape') {
        providerMultiSelect.classList.remove('open');
        workingProvidersTrigger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Select All Providers
  if (btnSelectAllProviders) {
    btnSelectAllProviders.addEventListener('click', (e) => {
      e.stopPropagation();
      currentOfficeProviders.forEach(p => selectedProviderIds.add(p.id));
      renderProviderOptions(currentOfficeProviders);
      updateProviderTriggerDisplay();
      syncHiddenProviderSelect();
    });
  }

  // Clear Selected Providers
  if (btnClearProviders) {
    btnClearProviders.addEventListener('click', (e) => {
      e.stopPropagation();
      selectedProviderIds.clear();
      renderProviderOptions(currentOfficeProviders);
      updateProviderTriggerDisplay();
      syncHiddenProviderSelect();
    });
  }

  // Close dropdown on click outside
  document.addEventListener('click', (e) => {
    if (providerMultiSelect && !providerMultiSelect.contains(e.target)) {
      providerMultiSelect.classList.remove('open');
      if (workingProvidersTrigger) {
        workingProvidersTrigger.setAttribute('aria-expanded', 'false');
      }
    }
  });

  // ==========================================================================
  // 4. SECTION 2: ENDOVISION DAILY TOTALS CURRENCY FORMATTING & INPUT HANDLING
  // ==========================================================================
  const endovisionFields = document.querySelectorAll('.ev-currency-field');

  function parseCurrencyValue(rawVal) {
    if (rawVal === undefined || rawVal === null || rawVal === '') return 0;
    // Strip everything except digits, decimal point, and leading minus sign
    const cleaned = String(rawVal).replace(/[^0-9.-]/g, '');
    const num = parseFloat(cleaned);
    return isNaN(num) ? 0 : num;
  }

  function formatAsCurrency(val) {
    const num = parseCurrencyValue(val);
    return num.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  endovisionFields.forEach(field => {
    // Select all text on focus for effortless replacement/typing
    field.addEventListener('focus', () => {
      field.select();
    });

    // Format entered value into standard two-decimal currency on blur
    field.addEventListener('blur', () => {
      field.value = formatAsCurrency(field.value);
    });

    // Handle keydown to ensure clean numeric entry
    field.addEventListener('keydown', (e) => {
      // Standard navigation & editing control keys
      const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'Home', 'End'];
      if (allowedKeys.includes(e.key) || e.ctrlKey || e.metaKey) {
        return;
      }
      // Allow numeric digits
      if (e.key >= '0' && e.key <= '9') {
        return;
      }
      // Allow single decimal point
      if (e.key === '.' && !field.value.includes('.')) {
        return;
      }
      // Allow negative sign at beginning if not already present
      if (e.key === '-' && field.selectionStart === 0 && !field.value.includes('-')) {
        return;
      }
      e.preventDefault();
    });
  });

  // ==========================================================================
  // 5. SECTION 3: COLLECTIONS BY PAYMENT TYPE INTERACTION & DYNAMIC ROWS
  // ==========================================================================
  const collectionsTableBody = document.getElementById('collectionsTableBody');
  const btnAddCollectionRow = document.getElementById('btnAddCollectionRow');

  const PAYMENT_METHOD_OPTIONS = [
    'Cash',
    'Checks',
    'Visa',
    'MasterCard',
    'Discover',
    'American Express',
    'CareCredit',
    'Sunbit',
    'ACH / Electronic Transfer',
    'Other'
  ];

  // Helper to dynamically update provider options in Section 3
  function updateCollectionsProviderOptions(providers) {
    const selects = document.querySelectorAll('.collections-provider-select');
    selects.forEach(select => {
      const currentVal = select.value;
      select.innerHTML = '<option value="" selected>Select / Enter #</option>';

      if (providers && providers.length > 0) {
        providers.forEach((p, idx) => {
          const opt = document.createElement('option');
          opt.value = p.id;
          opt.textContent = `${101 + idx} - ${p.name}`;
          if (p.id === currentVal) opt.selected = true;
          select.appendChild(opt);
        });
      } else {
        const defaultSample = [
          { id: '101', name: '101 - Dr. Sarah Jenkins' },
          { id: '102', name: '102 - Dr. Marcus Vance' },
          { id: '103', name: '103 - Dr. Emily Chen' }
        ];
        defaultSample.forEach(item => {
          const opt = document.createElement('option');
          opt.value = item.id;
          opt.textContent = item.name;
          if (item.id === currentVal) opt.selected = true;
          select.appendChild(opt);
        });
      }
    });
  }

  // Attach formatting and safe removal handlers to a collection row
  function attachCollectionRowHandlers(row) {
    const amountField = row.querySelector('.col-amount-field');
    const trashBtn = row.querySelector('.btn-trash-collection');

    if (amountField) {
      amountField.addEventListener('focus', () => {
        amountField.select();
      });

      amountField.addEventListener('input', () => {
        calculateReconciliationSummary();
      });

      amountField.addEventListener('blur', () => {
        amountField.value = formatAsCurrency(amountField.value);
        calculateReconciliationSummary();
      });

      amountField.addEventListener('keydown', (e) => {
        const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'Home', 'End'];
        if (allowedKeys.includes(e.key) || e.ctrlKey || e.metaKey) return;
        if (e.key >= '0' && e.key <= '9') return;
        if (e.key === '.' && !amountField.value.includes('.')) return;
        if (e.key === '-' && amountField.selectionStart === 0 && !amountField.value.includes('-')) return;
        e.preventDefault();
      });
    }

    if (trashBtn) {
      trashBtn.addEventListener('click', () => {
        // Find method name for clear confirmation dialog
        let methodName = row.dataset.method;
        if (!methodName) {
          const methodSelect = row.querySelector('.pay-method-select');
          methodName = methodSelect ? methodSelect.value : 'Payment Row';
        }

        const currentVal = parseCurrencyValue(amountField ? amountField.value : 0);
        // Prevent accidental removal if row contains entered data > 0
        if (currentVal > 0) {
          const isConfirmed = window.confirm(
            `This payment row for "${methodName}" contains an entered amount ($${amountField.value}). Are you sure you want to remove it?`
          );
          if (!isConfirmed) return;
        }

        row.remove();
        calculateReconciliationSummary();
      });
    }
  }

  // Attach handlers to initial static rows in Section 3
  if (collectionsTableBody) {
    const initialRows = collectionsTableBody.querySelectorAll('tr:not(.total-receipts-row)');
    initialRows.forEach(row => attachCollectionRowHandlers(row));
  }

  // Handle adding repeated/custom payment rows
  if (btnAddCollectionRow && collectionsTableBody) {
    btnAddCollectionRow.addEventListener('click', () => {
      const totalReceiptsRow = collectionsTableBody.querySelector('.total-receipts-row');
      const newRow = document.createElement('tr');
      newRow.className = 'collection-added-row';

      // Build payment method dropdown
      const methodOptionsHtml = PAYMENT_METHOD_OPTIONS.map(m => `<option value="${m}">${m}</option>`).join('');

      // Build provider dropdown options
      let providerOptionsHtml = '<option value="" selected>Select / Enter #</option>';
      if (currentOfficeProviders && currentOfficeProviders.length > 0) {
        currentOfficeProviders.forEach((p, idx) => {
          providerOptionsHtml += `<option value="${p.id}">${101 + idx} - ${p.name}</option>`;
        });
      } else {
        providerOptionsHtml += `
          <option value="101">101 - Dr. Sarah Jenkins</option>
          <option value="102">102 - Dr. Marcus Vance</option>
          <option value="103">103 - Dr. Emily Chen</option>
        `;
      }

      newRow.innerHTML = `
        <td>
          <select class="form-select-compact w-100 pay-method-select" style="height: 22px; font-size: 10px;" aria-label="Select Payment Method">
            ${methodOptionsHtml}
          </select>
        </td>
        <td>
          <select class="form-select-compact w-100 collections-provider-select" style="height: 22px; font-size: 10px;" aria-label="Select Provider">
            ${providerOptionsHtml}
          </select>
        </td>
        <td>
          <div class="currency-input-group">
            <span class="currency-symbol">$</span>
            <input type="text" class="currency-control col-amount-field" value="0.00" inputmode="decimal" placeholder="0.00" aria-label="Entered Payment Amount">
          </div>
        </td>
        <td class="text-center">
          <button type="button" class="btn-trash-collection" title="Remove Payment Row" aria-label="Remove Payment Row"><i class="bi bi-trash3"></i></button>
        </td>
      `;

      attachCollectionRowHandlers(newRow);

      if (totalReceiptsRow) {
        collectionsTableBody.insertBefore(newRow, totalReceiptsRow);
      } else {
        collectionsTableBody.appendChild(newRow);
      }

      calculateReconciliationSummary();
    });
  }

  // ==========================================================================
  // 6. SECTION 4: RECONCILIATION SUMMARY CALCULATION & WARNING MANAGEMENT
  // ==========================================================================
  const evNetCollectionsInput = document.getElementById('evNetCollections');
  const sec3TotalReceiptsInput = document.getElementById('sec3TotalReceiptsInput');
  const reconcileEndoAmount = document.getElementById('reconcileEndoAmount');
  const reconcileReceiptsAmount = document.getElementById('reconcileReceiptsAmount');
  const reconcileVarianceBox = document.getElementById('reconcileVarianceBox');
  const reconcileVarianceSymbol = document.getElementById('reconcileVarianceSymbol');
  const reconcileVarianceAmount = document.getElementById('reconcileVarianceAmount');
  const cardBalanced = document.getElementById('cardBalanced');
  const cardException = document.getElementById('cardException');
  const exceptionCardTitle = document.getElementById('exceptionCardTitle');
  const exceptionDetailsBox = document.getElementById('exceptionDetailsBox');
  const exceptionVarianceSymbol = document.getElementById('exceptionVarianceSymbol');
  const exceptionVarianceAmount = document.getElementById('exceptionVarianceAmount');
  const varianceExplanationInput = document.getElementById('varianceExplanation');

  function calculateReconciliationSummary() {
    // 1. Calculate Total EOD Receipts by summing all Section 3 payment amount inputs
    let totalEODReceipts = 0;
    const amountInputs = document.querySelectorAll('#collectionsTableBody .col-amount-field');
    amountInputs.forEach(input => {
      totalEODReceipts += parseCurrencyValue(input.value);
    });

    // 2. Read EndoVision Net Collections from Section 2
    const endoNetCollections = evNetCollectionsInput ? parseCurrencyValue(evNetCollectionsInput.value) : 0;

    // 3. Calculate Variance according to confirmed convention:
    // Variance = Total EOD Receipts - EndoVision Net Collections
    const variance = totalEODReceipts - endoNetCollections;
    const isBalanced = Math.abs(variance) < 0.005;

    // 4. Update Section 3 Total Receipts summary display
    if (sec3TotalReceiptsInput) {
      sec3TotalReceiptsInput.value = formatAsCurrency(totalEODReceipts);
    }

    // 5. Update Section 4 Summary displays
    if (reconcileReceiptsAmount) {
      reconcileReceiptsAmount.textContent = formatAsCurrency(totalEODReceipts);
    }
    if (reconcileEndoAmount) {
      reconcileEndoAmount.textContent = formatAsCurrency(endoNetCollections);
    }

    // 6. Update Variance and Status Indicators
    const formattedAbsVariance = formatAsCurrency(Math.abs(variance));

    if (isBalanced) {
      // Balanced State ($0 variance)
      if (reconcileVarianceSymbol) reconcileVarianceSymbol.textContent = '$';
      if (reconcileVarianceAmount) reconcileVarianceAmount.textContent = '0.00';
      if (reconcileVarianceBox) {
        reconcileVarianceBox.className = 'reconcile-display-box balanced-state';
      }

      if (cardBalanced) cardBalanced.style.display = 'flex';
      if (cardException) cardException.style.display = 'none';

      if (exceptionDetailsBox) {
        exceptionDetailsBox.className = 'exception-box is-balanced';
      }
      if (exceptionVarianceSymbol) exceptionVarianceSymbol.textContent = '$';
      if (exceptionVarianceAmount) exceptionVarianceAmount.value = '0.00';
      if (varianceExplanationInput) {
        varianceExplanationInput.required = false;
      }
    } else {
      // Exception State (Non-zero variance)
      const sign = variance < 0 ? '-$' : '+$';

      if (reconcileVarianceSymbol) reconcileVarianceSymbol.textContent = sign;
      if (reconcileVarianceAmount) reconcileVarianceAmount.textContent = formattedAbsVariance;
      if (reconcileVarianceBox) {
        reconcileVarianceBox.className = 'reconcile-display-box exception-state';
      }

      if (cardBalanced) cardBalanced.style.display = 'none';
      if (cardException) cardException.style.display = 'flex';
      if (exceptionCardTitle) {
        exceptionCardTitle.textContent = `Exception \u2014 Variance requires review (${sign}${formattedAbsVariance})`;
      }

      if (exceptionDetailsBox) {
        exceptionDetailsBox.className = 'exception-box is-exception';
      }
      if (exceptionVarianceSymbol) exceptionVarianceSymbol.textContent = sign;
      if (exceptionVarianceAmount) exceptionVarianceAmount.value = formattedAbsVariance;
      if (varianceExplanationInput) {
        varianceExplanationInput.required = true;
      }
    }
  }

  // Bind Section 2 Net Collections field to update reconciliation immediately
  if (evNetCollectionsInput) {
    evNetCollectionsInput.addEventListener('input', calculateReconciliationSummary);
    evNetCollectionsInput.addEventListener('change', calculateReconciliationSummary);
    evNetCollectionsInput.addEventListener('blur', calculateReconciliationSummary);
  }

  // Initial calculation run on page load
  calculateReconciliationSummary();

  // ==========================================================================
  // 7. SECTION 4A: PATIENT PAYMENT DETAILS DYNAMIC ROWS & REAL-TIME TOTALS
  // ==========================================================================
  const patientTableBody = document.getElementById('patientPaymentsTableBody');
  const btnAddPatientRow = document.getElementById('btnAddPatientRow');
  const totalPatientPaymentsInput = document.getElementById('totalPatientPaymentsInput');

  // Helper to generate provider dropdown HTML based on active office location
  function getPatientProviderOptionsHtml(selectedVal = '') {
    let optionsHtml = '<option value="" selected>Select</option>';
    if (currentOfficeProviders && currentOfficeProviders.length > 0) {
      currentOfficeProviders.forEach((p, idx) => {
        const pNum = 101 + idx;
        const pLabel = `${pNum} - ${p.name}`;
        const isSelected = selectedVal === String(pNum) || selectedVal === p.id || selectedVal === pLabel;
        optionsHtml += `<option value="${pNum}" ${isSelected ? 'selected' : ''}>${pLabel}</option>`;
      });
    } else {
      const defaultSample = [
        { id: '101', name: '101 - Dr. Sarah Jenkins' },
        { id: '102', name: '102 - Dr. Marcus Vance' },
        { id: '103', name: '103 - Dr. Emily Chen' }
      ];
      defaultSample.forEach(item => {
        const isSelected = selectedVal === item.id || selectedVal === item.name;
        optionsHtml += `<option value="${item.id}" ${isSelected ? 'selected' : ''}>${item.name}</option>`;
      });
    }
    return optionsHtml;
  }

  // Update all Section 4A provider dropdowns when Office Location changes
  function updatePatientProviderOptions(providers) {
    if (!patientTableBody) return;
    const providerSelects = patientTableBody.querySelectorAll('.patient-provider-select');
    providerSelects.forEach(select => {
      const currentVal = select.value;
      select.innerHTML = getPatientProviderOptionsHtml(currentVal);
    });
  }

  // Calculate total patient payments sum
  function calculateTotalPatientPayments() {
    if (!patientTableBody) return 0;
    let total = 0;
    const amountFields = patientTableBody.querySelectorAll('.patient-amount-field');
    amountFields.forEach(field => {
      const val = parseCurrencyValue(field.value);
      if (!isNaN(val) && isFinite(val) && val > 0) {
        total += val;
      }
    });

    if (totalPatientPaymentsInput) {
      totalPatientPaymentsInput.value = formatAsCurrency(total);
      totalPatientPaymentsInput.dispatchEvent(new Event('input', { bubbles: true }));
      totalPatientPaymentsInput.dispatchEvent(new Event('change', { bubbles: true }));
    }
    return total;
  }

  // Renumber remaining patient rows sequentially (1, 2, 3...)
  function renumberPatientRows() {
    if (!patientTableBody) return;
    const rows = patientTableBody.querySelectorAll('tr');
    rows.forEach((row, idx) => {
      const rowNum = idx + 1;
      const numCell = row.querySelector('.row-num');
      if (numCell) numCell.textContent = rowNum;

      const refInput = row.querySelector('.patient-ref-input');
      if (refInput) {
        refInput.setAttribute('aria-label', `Patient Reference # Row ${rowNum}`);
        refInput.name = `patient_ref_${rowNum}`;
      }

      const amtInput = row.querySelector('.patient-amount-field');
      if (amtInput) {
        amtInput.setAttribute('aria-label', `Payment Amount Row ${rowNum}`);
        amtInput.name = `patient_amount_${rowNum}`;
      }

      const typeSelect = row.querySelector('.patient-type-select');
      if (typeSelect) {
        typeSelect.setAttribute('aria-label', `Payment Type Row ${rowNum}`);
        typeSelect.name = `patient_type_${rowNum}`;
      }

      const sourceSelect = row.querySelector('.patient-source-select');
      if (sourceSelect) {
        sourceSelect.setAttribute('aria-label', `Payment Source Row ${rowNum}`);
        sourceSelect.name = `patient_source_${rowNum}`;
      }

      const appliedSelect = row.querySelector('.patient-applied-select');
      if (appliedSelect) {
        appliedSelect.setAttribute('aria-label', `Payment Application / Purpose Row ${rowNum}`);
        appliedSelect.name = `patient_applied_${rowNum}`;
      }

      const provSelect = row.querySelector('.patient-provider-select');
      if (provSelect) {
        provSelect.setAttribute('aria-label', `Provider Number Row ${rowNum}`);
        provSelect.name = `patient_provider_${rowNum}`;
      }

      const trashBtn = row.querySelector('.btn-trash');
      if (trashBtn) {
        trashBtn.setAttribute('aria-label', `Delete Row ${rowNum}`);
        trashBtn.setAttribute('title', `Delete Row ${rowNum}`);
      }
    });
  }

  // Event Delegation on patientTableBody for robust handling of both static and dynamic rows
  if (patientTableBody) {
    // Focus: select all text in payment amount field for effortless entry
    patientTableBody.addEventListener('focusin', (e) => {
      if (e.target.classList.contains('patient-amount-field')) {
        e.target.select();
      }
    });

    // Input: immediately update totals when amounts change
    patientTableBody.addEventListener('input', (e) => {
      if (e.target.classList.contains('patient-amount-field')) {
        calculateTotalPatientPayments();
      }
    });

    // Blur / Focusout: format to standard currency on blur and ensure empty string defaults to 0.00
    patientTableBody.addEventListener('focusout', (e) => {
      if (e.target.classList.contains('patient-amount-field')) {
        const trimmed = e.target.value.trim();
        if (trimmed === '' || isNaN(parseCurrencyValue(trimmed)) || parseCurrencyValue(trimmed) <= 0) {
          e.target.value = '0.00';
        } else {
          e.target.value = formatAsCurrency(e.target.value);
        }
        calculateTotalPatientPayments();
      }
    });

    // Keydown: restrict to valid numeric currency characters
    patientTableBody.addEventListener('keydown', (e) => {
      if (e.target.classList.contains('patient-amount-field')) {
        const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'Home', 'End'];
        if (allowedKeys.includes(e.key) || e.ctrlKey || e.metaKey) return;
        if (e.key >= '0' && e.key <= '9') return;
        if (e.key === '.' && !e.target.value.includes('.')) return;
        e.preventDefault();
      }
    });

    // Click: handle row deletion immediately and update numbering & totals
    patientTableBody.addEventListener('click', (e) => {
      const trashBtn = e.target.closest('.btn-trash');
      if (!trashBtn) return;
      const row = trashBtn.closest('tr');
      if (!row) return;

      row.remove();
      renumberPatientRows();
      calculateTotalPatientPayments();
    });
  }

  // Handle adding new patient payment row
  if (btnAddPatientRow && patientTableBody) {
    btnAddPatientRow.addEventListener('click', () => {
      const currentRows = patientTableBody.querySelectorAll('tr').length;
      const nextIndex = currentRows + 1;

      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td class="text-center row-num">${nextIndex}</td>
        <td><input type="text" name="patient_ref_${nextIndex}" class="table-input patient-ref-input" placeholder="" aria-label="Patient Reference # Row ${nextIndex}"></td>
        <td>
          <div class="currency-input-group">
            <span class="currency-symbol">$</span>
            <input type="text" name="patient_amount_${nextIndex}" class="currency-control patient-amount-field" value="0.00" inputmode="decimal" placeholder="0.00" aria-label="Payment Amount Row ${nextIndex}">
          </div>
        </td>
        <td>
          <select name="patient_type_${nextIndex}" class="table-select patient-type-select" aria-label="Payment Type Row ${nextIndex}">
            <option value="" selected>Select</option>
            <option value="Cash">Cash</option>
            <option value="Check">Check</option>
            <option value="Visa">Visa</option>
            <option value="MasterCard">MasterCard</option>
            <option value="Discover">Discover</option>
            <option value="American Express">American Express</option>
            <option value="CareCredit">CareCredit</option>
            <option value="Sunbit">Sunbit</option>
            <option value="ACH">ACH / Electronic</option>
            <option value="Other">Other</option>
          </select>
        </td>
        <td>
          <select name="patient_source_${nextIndex}" class="table-select patient-source-select" aria-label="Payment Source Row ${nextIndex}">
            <option value="" selected>Select</option>
            <option value="Patient">Patient</option>
            <option value="Insurance Primary">Insurance (Primary)</option>
            <option value="Insurance Secondary">Insurance (Secondary)</option>
            <option value="Patient Financing">Patient Financing</option>
            <option value="Medicaid / AHCCCS">Medicaid / AHCCCS</option>
            <option value="Other">Other Source</option>
          </select>
        </td>
        <td>
          <select name="patient_applied_${nextIndex}" class="table-select patient-applied-select" aria-label="Payment Application / Purpose Row ${nextIndex}">
            <option value="" selected>Select</option>
            <option value="Treatment">Treatment</option>
            <option value="Copay">Copay</option>
            <option value="Deductible">Deductible</option>
            <option value="Account Balance">Account Balance</option>
            <option value="Pre-Payment">Pre-Payment / Deposit</option>
            <option value="Other">Other</option>
          </select>
        </td>
        <td>
          <select name="patient_provider_${nextIndex}" class="table-select patient-provider-select" aria-label="Provider Number Row ${nextIndex}">
            ${getPatientProviderOptionsHtml()}
          </select>
        </td>
        <td class="text-center">
          <button type="button" class="btn-trash" title="Delete Row ${nextIndex}" aria-label="Delete Row ${nextIndex}">
            <i class="bi bi-trash3"></i>
          </button>
        </td>
      `;

      patientTableBody.appendChild(newRow);
      const newRef = newRow.querySelector('.patient-ref-input');
      if (newRef) newRef.focus();

      calculateTotalPatientPayments();
    });
  }

  // Initial calculation on page load
  calculateTotalPatientPayments();

  // ==========================================================================
  // 5. PRESERVED WORKFLOW: SECTION 6 SUPPORTING DOCUMENTATION UPLOADS
  // ==========================================================================
  const uploadButtons = document.querySelectorAll('.btn-upload-file');
  uploadButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const parentCard = btn.closest('.upload-card');
      const hiddenInput = parentCard.querySelector('input[type="file"]');
      if (hiddenInput) {
        hiddenInput.click();
      }
    });
  });

  const fileInputs = document.querySelectorAll('.upload-card input[type="file"]');
  fileInputs.forEach(input => {
    input.addEventListener('change', () => {
      const parentCard = input.closest('.upload-card');
      const hint = parentCard.querySelector('.upload-hint');
      if (input.files && input.files.length > 0) {
        hint.textContent = `Selected: ${input.files[0].name} (${(input.files[0].size / 1024).toFixed(1)} KB)`;
        hint.style.color = '#00478f';
        hint.style.fontWeight = '600';
      }
    });
  });
});
