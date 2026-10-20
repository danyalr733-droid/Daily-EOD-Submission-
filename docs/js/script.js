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
        { id: '101', num: '101', name: 'Dr. Sarah Jenkins', specialty: 'Endodontist' },
        { id: '102', num: '102', name: 'Dr. Marcus Vance', specialty: 'Oral Surgeon' },
        { id: '103', num: '103', name: 'Dr. Emily Chen', specialty: 'Endodontist' }
      ]
    },
    'chandler': {
      name: 'Chandler (Sample Office)',
      manager: 'David Reynolds (Sample OM)',
      providers: [
        { id: '101', num: '101', name: 'Dr. Robert Taylor', specialty: 'Oral Surgeon' },
        { id: '102', num: '102', name: 'Dr. Jessica Adams', specialty: 'Endodontist' },
        { id: '103', num: '103', name: 'Dr. Brian Lee', specialty: 'Oral Surgeon' }
      ]
    },
    'gilbert': {
      name: 'Gilbert (Sample Office)',
      manager: 'Lisa Hernandez (Sample OM)',
      providers: [
        { id: '101', num: '101', name: 'Dr. Michael Chang', specialty: 'Oral Surgeon' },
        { id: '102', num: '102', name: 'Dr. Amanda Brooks', specialty: 'Endodontist' },
        { id: '103', num: '103', name: 'Dr. Rachel Garcia', specialty: 'Endodontist' }
      ]
    },
    'glendale': {
      name: 'Glendale (Sample Office)',
      manager: 'Thomas Moore (Sample OM)',
      providers: [
        { id: '101', num: '101', name: 'Dr. Kevin Patel', specialty: 'Oral Surgeon' },
        { id: '102', num: '102', name: 'Dr. Laura Martinez', specialty: 'Endodontist' }
      ]
    },
    'mesa': {
      name: 'Mesa (Sample Office)',
      manager: 'Patricia Wilson (Sample OM)',
      providers: [
        { id: '101', num: '101', name: 'Dr. David Clark', specialty: 'Oral Surgeon' },
        { id: '102', num: '102', name: 'Dr. Christopher Scott', specialty: 'Endodontist' },
        { id: '103', num: '103', name: 'Dr. Nicole Turner', specialty: 'Oral Surgeon' }
      ]
    },
    'north-phoenix': {
      name: 'North Phoenix (Sample Office)',
      manager: 'James Anderson (Sample OM)',
      providers: [
        { id: '101', num: '101', name: 'Dr. William Harris', specialty: 'Endodontist' },
        { id: '102', num: '102', name: 'Dr. Stephanie White', specialty: 'Oral Surgeon' },
        { id: '103', num: '103', name: 'Dr. Benjamin Lewis', specialty: 'Endodontist' },   
        {id: '104', num: '104', name: 'Dr. Olivia Young', specialty: 'Oral Surgeon'}
      ]
    },
    'scottsdale': {
      name: 'Scottsdale (Sample Office)',
      manager: 'Angela Davis (Sample OM)',
      providers: [
        { id: '101', num: '101', name: 'Dr. Gregory Hall', specialty: 'Endodontist' },
        { id: '102', num: '102', name: 'Dr. Samantha Bennett', specialty: 'Oral Surgeon' },
        { id: '103', num: '103', name: 'Dr. Andrew Miller', specialty: 'Endodontist' }
      ]
    },
    'peoria': {
      name: 'Peoria (Sample Office)',
      manager: 'Jessica Miller (Sample OM)',
      providers: [
        { id: '101', num: '101', name: 'Dr. Kimberly Adams', specialty: 'Endodontist' },
        { id: '102', num: '102', name: 'Dr. Ryan Peterson', specialty: 'Oral Surgeon' }
      ]
    },
    'surprise': {
      name: 'Surprise (Sample Office)',
      manager: 'Jennifer White (Sample OM)',
      providers: [
        { id: '101', num: '101', name: 'Dr. Joseph Diaz', specialty: 'Oral Surgeon' },
        { id: '102', num: '102', name: 'Dr. Christine Kelly', specialty: 'Endodontist' }
      ]
    },
    'tempe': {
      name: 'Tempe (Sample Office)',
      manager: 'Melissa Green (Sample OM)',
      providers: [
        { id: '101', num: '101', name: 'Dr. Daniel Wood', specialty: 'Endodontist' },
        { id: '102', num: '102', name: 'Dr. Kelly Rogers', specialty: 'Oral Surgeon' }
      ]
    },
    'goodyear': {
      name: 'Goodyear (Sample Office)',
      manager: 'Brian Scott (Sample OM)',
      providers: [
        { id: '101', num: '101', name: 'Dr. Brandon Hill', specialty: 'Oral Surgeon' },
        { id: '102', num: '102', name: 'Dr. Natalie Hughes', specialty: 'Endodontist' }
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

  // Production & Adjustments inputs for automatic Net Production calculation
  const evProductionInput = document.getElementById('evProduction');
  const evAdjustmentsInput = document.getElementById('evAdjustments');
  const evNetProductionInput = document.getElementById('evNetProduction');

  function calculateNetProduction() {
    const prod = parseCurrencyValue(evProductionInput ? evProductionInput.value : 0);
    const adj = parseCurrencyValue(evAdjustmentsInput ? evAdjustmentsInput.value : 0);
    const netProd = prod + adj;
    if (evNetProductionInput) {
      evNetProductionInput.value = formatAsCurrency(netProd);
    }
    return netProd;
  }

  if (evProductionInput) {
    evProductionInput.addEventListener('input', calculateNetProduction);
    evProductionInput.addEventListener('blur', calculateNetProduction);
    evProductionInput.addEventListener('change', calculateNetProduction);
  }
  if (evAdjustmentsInput) {
    evAdjustmentsInput.addEventListener('input', calculateNetProduction);
    evAdjustmentsInput.addEventListener('blur', calculateNetProduction);
    evAdjustmentsInput.addEventListener('change', calculateNetProduction);
  }
  calculateNetProduction();

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
        providers.forEach((p) => {
          const opt = document.createElement('option');
          opt.value = p.id;
          opt.textContent = `${p.num || p.id} - ${p.name}`;
          if (p.id === currentVal || (p.num && p.num === currentVal)) opt.selected = true;
          select.appendChild(opt);
        });
      } else {
        const defaultSample = [
          { id: '101', num: '101', name: 'Dr. Sarah Jenkins' },
          { id: '102', num: '102', name: 'Dr. Marcus Vance' },
          { id: '103', num: '103', name: 'Dr. Emily Chen' }
        ];
        defaultSample.forEach(p => {
          const opt = document.createElement('option');
          opt.value = p.id;
          opt.textContent = `${p.num} - ${p.name}`;
          if (p.id === currentVal || p.num === currentVal) opt.selected = true;
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
  let currentReconciliation = {
    totalEODReceipts: 0,
    endoNetCollections: 0,
    variance: 0,
    isBalanced: true
  };

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

    currentReconciliation = {
      totalEODReceipts,
      endoNetCollections,
      variance,
      isBalanced
    };

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
        varianceExplanationInput.classList.remove('is-invalid');
        document.getElementById('varianceExplanationError')?.classList.add('d-none');
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

    return currentReconciliation;
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
  // 8. SECTION 5: DAILY CONTROL QUESTIONS INTERACTION & VALIDATION
  // ==========================================================================
  const controlRadios = document.querySelectorAll('input[type="radio"][name^="control_q"]');
  controlRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      const qGroup = radio.closest('.control-question-item');
      if (qGroup) {
        qGroup.classList.remove('has-error');
        const err = qGroup.querySelector('.control-q-error');
        if (err) err.classList.add('d-none');
      }
    });
  });

  // ==========================================================================
  // 9. SECTION 6: SUPPORTING DOCUMENTATION UPLOAD & CLEAR WORKFLOW
  // ==========================================================================
  const uploadCards = document.querySelectorAll('.upload-card');
  uploadCards.forEach(card => {
    const fileInput = card.querySelector('input[type="file"]');
    const uploadBtn = card.querySelector('.btn-upload-file');
    const clearBtn = card.querySelector('.btn-clear-file');
    const hint = card.querySelector('.upload-hint');
    const err = card.querySelector('.upload-error-feedback');

    if (uploadBtn && fileInput) {
      uploadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        fileInput.click();
      });
    }

    if (fileInput) {
      fileInput.addEventListener('change', () => {
        if (fileInput.files && fileInput.files.length > 0) {
          const file = fileInput.files[0];
          const sizeKb = (file.size / 1024).toFixed(1);
          if (hint) {
            hint.textContent = `Selected: ${file.name} (${sizeKb} KB)`;
            hint.classList.add('has-file');
          }
          if (clearBtn) clearBtn.classList.remove('d-none');
          if (card) card.classList.remove('has-error');
          if (err) err.classList.add('d-none');
        }
      });
    }

    if (clearBtn && fileInput) {
      clearBtn.addEventListener('click', (e) => {
        e.preventDefault();
        fileInput.value = '';
        if (hint) {
          hint.textContent = 'PDF, Excel, or Image (Max 10MB)';
          hint.classList.remove('has-file');
        }
        clearBtn.classList.add('d-none');
        if (card) card.classList.remove('has-error');
        if (err) err.classList.add('d-none');
      });
    }
  });

  // ==========================================================================
  // 10. REAL-TIME ERROR CLEARANCE ON USER INPUT
  // ==========================================================================
  const sec1Date = document.getElementById('eodDate');
  const sec1Loc = document.getElementById('officeLocation');
  const sec1Mgr = document.getElementById('officeManager');
  const sec1Sub = document.getElementById('submittedBy');

  if (sec1Date) {
    sec1Date.addEventListener('input', () => {
      sec1Date.classList.remove('is-invalid');
      document.getElementById('eodDateError')?.classList.add('d-none');
    });
  }
  if (sec1Loc) {
    sec1Loc.addEventListener('change', () => {
      sec1Loc.classList.remove('is-invalid');
      document.getElementById('officeLocationError')?.classList.add('d-none');
    });
  }
  if (sec1Mgr) {
    sec1Mgr.addEventListener('input', () => {
      sec1Mgr.classList.remove('is-invalid');
      document.getElementById('officeManagerError')?.classList.add('d-none');
    });
  }
  if (sec1Sub) {
    sec1Sub.addEventListener('input', () => {
      sec1Sub.classList.remove('is-invalid');
      document.getElementById('submittedByError')?.classList.add('d-none');
    });
  }

  if (varianceExplanationInput) {
    varianceExplanationInput.addEventListener('input', () => {
      varianceExplanationInput.classList.remove('is-invalid');
      document.getElementById('varianceExplanationError')?.classList.add('d-none');
    });
  }

  const certifyCheckbox = document.getElementById('certifyCheckbox');
  const certWrapper = document.getElementById('certWrapper');
  const certError = document.getElementById('certError');
  if (certifyCheckbox) {
    certifyCheckbox.addEventListener('change', () => {
      if (certifyCheckbox.checked) {
        if (certWrapper) certWrapper.classList.remove('has-error');
        if (certError) certError.classList.add('d-none');
      }
    });
  }

  // ==========================================================================
  // 11. SECTION 7: VALIDATION ENGINE & DEMO SUBMISSION CONFIRMATION
  // ==========================================================================
  const btnSubmitEOD = document.getElementById('btnSubmitEOD');
  const submissionComments = document.getElementById('submissionComments');

  function validateEODForm() {
    const errors = [];

    // 1. Section 1: Location Information
    if (!sec1Date || !sec1Date.value) {
      if (sec1Date) sec1Date.classList.add('is-invalid');
      document.getElementById('eodDateError')?.classList.remove('d-none');
      errors.push({ element: sec1Date, message: 'Reporting Date is required.' });
    }

    if (!sec1Loc || !sec1Loc.value) {
      if (sec1Loc) sec1Loc.classList.add('is-invalid');
      document.getElementById('officeLocationError')?.classList.remove('d-none');
      errors.push({ element: sec1Loc, message: 'Office Location is required.' });
    }

    if (!sec1Mgr || !sec1Mgr.value.trim()) {
      if (sec1Mgr) sec1Mgr.classList.add('is-invalid');
      document.getElementById('officeManagerError')?.classList.remove('d-none');
      errors.push({ element: sec1Mgr, message: 'Office Manager is required.' });
    }

    if (!sec1Sub || !sec1Sub.value.trim()) {
      if (sec1Sub) sec1Sub.classList.add('is-invalid');
      document.getElementById('submittedByError')?.classList.remove('d-none');
      errors.push({ element: sec1Sub, message: 'Submitted By name is required.' });
    }

    // 2. Section 4: If Exception, Explanation is required
    calculateReconciliationSummary();
    if (!currentReconciliation.isBalanced) {
      if (!varianceExplanationInput || !varianceExplanationInput.value.trim()) {
        if (varianceExplanationInput) varianceExplanationInput.classList.add('is-invalid');
        document.getElementById('varianceExplanationError')?.classList.remove('d-none');
        errors.push({ element: varianceExplanationInput, message: 'Explanation of variance is required.' });
      }
    }

    // 3. Section 5: Daily Control Questions (all 4 are required)
    for (let i = 1; i <= 4; i++) {
      const selected = document.querySelector(`input[name="control_q${i}"]:checked`);
      const qGroup = document.getElementById(`qGroup${i}`);
      const qErr = document.getElementById(`qError${i}`);
      if (!selected) {
        if (qGroup) qGroup.classList.add('has-error');
        if (qErr) qErr.classList.remove('d-none');
        const firstRadio = document.getElementById(`q${i}_yes`);
        errors.push({ element: firstRadio || qGroup, message: `Question ${i} must be answered.` });
      } else {
        if (qGroup) qGroup.classList.remove('has-error');
        if (qErr) qErr.classList.add('d-none');
      }
    }

    // 4. Section 6: Required Supporting Documentation (Uploads 1, 2, 3)
    const requiredDocs = [
      { id: 'fileEndoReport', cardId: 'cardFileEndoReport', errId: 'fileEndoReportError', name: 'EndoVision Daily Report' },
      { id: 'fileBalanceSheet', cardId: 'cardFileBalanceSheet', errId: 'fileBalanceSheetError', name: 'Daily Balance Sheet / EOD Worksheet' },
      { id: 'fileSettlementSupport', cardId: 'cardFileSettlementSupport', errId: 'fileSettlementSupportError', name: 'Deposit / Merchant Settlement Support' }
    ];

    requiredDocs.forEach(doc => {
      const input = document.getElementById(doc.id);
      const card = document.getElementById(doc.cardId);
      const err = document.getElementById(doc.errId);
      const btn = card ? card.querySelector('.btn-upload-file') : null;

      if (!input || !input.files || input.files.length === 0) {
        if (card) card.classList.add('has-error');
        if (err) err.classList.remove('d-none');
        errors.push({ element: btn || card, message: `Missing required document: ${doc.name}` });
      } else {
        if (card) card.classList.remove('has-error');
        if (err) err.classList.add('d-none');
      }
    });

    // 5. Section 7: Certification Checkbox
    if (!certifyCheckbox || !certifyCheckbox.checked) {
      if (certWrapper) certWrapper.classList.add('has-error');
      if (certError) certError.classList.remove('d-none');
      errors.push({ element: certifyCheckbox || certWrapper, message: 'Certification checkbox is required.' });
    } else {
      if (certWrapper) certWrapper.classList.remove('has-error');
      if (certError) certError.classList.add('d-none');
    }

    return errors;
  }

  function populateSubmissionSummary() {
    const summaryReportDate = document.getElementById('summaryReportDate');
    const summaryTimestamp = document.getElementById('summaryTimestamp');
    const summaryLocation = document.getElementById('summaryLocation');
    const summaryManager = document.getElementById('summaryManager');
    const summarySubmittedBy = document.getElementById('summarySubmittedBy');
    const summaryProviders = document.getElementById('summaryProviders');
    const summaryEndo = document.getElementById('summaryEndo');
    const summaryReceipts = document.getElementById('summaryReceipts');
    const summaryVariance = document.getElementById('summaryVariance');
    const summaryReconcileStatus = document.getElementById('summaryReconcileStatus');
    const summaryVarianceExplanationRow = document.getElementById('summaryVarianceExplanationRow');
    const summaryVarianceExplanation = document.getElementById('summaryVarianceExplanation');
    const summaryControlQuestions = document.getElementById('summaryControlQuestions');
    const summaryDocuments = document.getElementById('summaryDocuments');
    const summaryCommentsRow = document.getElementById('summaryCommentsRow');
    const summaryComments = document.getElementById('summaryComments');

    if (summaryReportDate) summaryReportDate.textContent = sec1Date?.value || '—';
    if (summaryTimestamp) {
      summaryTimestamp.textContent = new Date().toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'medium'
      });
    }
    if (summaryLocation) {
      summaryLocation.textContent = sec1Loc?.options[sec1Loc.selectedIndex]?.text || '—';
    }
    if (summaryManager) summaryManager.textContent = sec1Mgr?.value || '—';
    if (summarySubmittedBy) summarySubmittedBy.textContent = sec1Sub?.value || '—';

    if (summaryProviders) {
      if (selectedProviderIds && selectedProviderIds.size > 0 && currentOfficeProviders) {
        const names = currentOfficeProviders
          .filter(p => selectedProviderIds.has(p.id))
          .map(p => p.name);
        summaryProviders.textContent = names.join(', ');
      } else {
        summaryProviders.textContent = 'None specified (All Clinic Providers)';
      }
    }

    if (summaryEndo) summaryEndo.textContent = `$ ${formatAsCurrency(currentReconciliation.endoNetCollections)}`;
    if (summaryReceipts) summaryReceipts.textContent = `$ ${formatAsCurrency(currentReconciliation.totalEODReceipts)}`;
    
    if (summaryVariance) {
      const sign = currentReconciliation.variance < 0 ? '-$' : (currentReconciliation.variance > 0 ? '+$' : '$');
      summaryVariance.textContent = `${sign} ${formatAsCurrency(Math.abs(currentReconciliation.variance))}`;
      summaryVariance.style.color = currentReconciliation.isBalanced ? '#16a34a' : '#dc2626';
    }

    if (summaryReconcileStatus) {
      if (currentReconciliation.isBalanced) {
        summaryReconcileStatus.className = 'badge bg-success';
        summaryReconcileStatus.textContent = 'Balanced ($0 variance)';
      } else {
        summaryReconcileStatus.className = 'badge bg-danger';
        summaryReconcileStatus.textContent = 'Exception — Variance Requires Review';
      }
    }

    if (summaryVarianceExplanationRow && summaryVarianceExplanation) {
      if (!currentReconciliation.isBalanced && varianceExplanationInput && varianceExplanationInput.value.trim()) {
        summaryVarianceExplanationRow.style.display = 'block';
        summaryVarianceExplanation.textContent = varianceExplanationInput.value.trim();
      } else {
        summaryVarianceExplanationRow.style.display = 'none';
      }
    }

    if (summaryControlQuestions) {
      summaryControlQuestions.innerHTML = '';
      const qLabels = [
        '1. All patient transactions entered into EndoVision',
        '2. All claims submitted for the day',
        '3. EOD reconciles to EndoVision Daily Report',
        '4. Deposit / settlement support agrees with receipts'
      ];
      for (let i = 1; i <= 4; i++) {
        const checked = document.querySelector(`input[name="control_q${i}"]:checked`);
        const ans = checked ? (checked.value === 'yes' ? 'Yes' : 'No') : 'Unanswered';
        const li = document.createElement('li');
        li.innerHTML = `<strong>${qLabels[i-1]}:</strong> <span class="badge ${ans.toLowerCase() === 'yes' ? 'bg-success' : 'bg-warning text-dark'}">${ans}</span>`;
        summaryControlQuestions.appendChild(li);
      }
    }

    if (summaryDocuments) {
      summaryDocuments.innerHTML = '';
      const docLabels = [
        { id: 'fileEndoReport', name: 'EndoVision Daily Report' },
        { id: 'fileBalanceSheet', name: 'Daily Balance Sheet / EOD Worksheet' },
        { id: 'fileSettlementSupport', name: 'Deposit / Merchant Settlement Support' },
        { id: 'fileOtherSupport', name: 'Other Supporting Documentation' }
      ];
      docLabels.forEach(d => {
        const input = document.getElementById(d.id);
        const li = document.createElement('li');
        if (input && input.files && input.files.length > 0) {
          const file = input.files[0];
          const kb = (file.size / 1024).toFixed(1);
          li.innerHTML = `<strong>${d.name}:</strong> ${file.name} (${kb} KB)`;
        } else {
          li.innerHTML = `<strong>${d.name}:</strong> <em class="text-muted">Not attached (Optional)</em>`;
        }
        summaryDocuments.appendChild(li);
      });
    }

    if (summaryCommentsRow && summaryComments) {
      if (submissionComments && submissionComments.value.trim()) {
        summaryCommentsRow.style.display = 'block';
        summaryComments.textContent = submissionComments.value.trim();
      } else {
        summaryCommentsRow.style.display = 'none';
      }
    }
  }

  if (btnSubmitEOD) {
    btnSubmitEOD.addEventListener('click', (e) => {
      e.preventDefault();

      const validationErrors = validateEODForm();
      if (validationErrors.length > 0) {
        const firstErr = validationErrors[0];
        if (firstErr.element) {
          if (typeof firstErr.element.focus === 'function') {
            firstErr.element.focus();
          }
          firstErr.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      // Prevent repeated clicks during processing
      const originalBtnHtml = btnSubmitEOD.innerHTML;
      btnSubmitEOD.disabled = true;
      btnSubmitEOD.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Submitting EOD...';

      // Brief async frontend simulation
      setTimeout(() => {
        btnSubmitEOD.disabled = false;
        btnSubmitEOD.innerHTML = originalBtnHtml;

        populateSubmissionSummary();

        const modalEl = document.getElementById('submissionModal');
        if (modalEl && typeof bootstrap !== 'undefined' && bootstrap.Modal) {
          const modalInstance = new bootstrap.Modal(modalEl);
          modalInstance.show();
        } else {
          alert('Submission successful! (Frontend demo notice: No permanent record saved to server or database.)');
        }
      }, 400);
    });
  }

  const btnResetDemo = document.getElementById('btnResetDemo');
  if (btnResetDemo) {
    btnResetDemo.addEventListener('click', () => {
      controlRadios.forEach(r => { r.checked = false; });
      uploadCards.forEach(card => {
        const fileInput = card.querySelector('input[type="file"]');
        const hint = card.querySelector('.upload-hint');
        const clearBtn = card.querySelector('.btn-clear-file');
        if (fileInput) fileInput.value = '';
        if (hint) {
          hint.textContent = 'PDF, Excel, or Image (Max 10MB)';
          hint.classList.remove('has-file');
        }
        if (clearBtn) clearBtn.classList.add('d-none');
        card.classList.remove('has-error');
      });
      if (certifyCheckbox) certifyCheckbox.checked = false;
      if (submissionComments) submissionComments.value = '';

      const modalEl = document.getElementById('submissionModal');
      if (modalEl && typeof bootstrap !== 'undefined' && bootstrap.Modal) {
        const instance = bootstrap.Modal.getInstance(modalEl);
        if (instance) instance.hide();
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
