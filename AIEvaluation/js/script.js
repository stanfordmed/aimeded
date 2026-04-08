// Patient data for different datasets
const datasets = {
    separated: {
        // Good separation with some overlap - AUC ~0.9
        pneumonia: [
            45, 52, 58, 62, 65, 68, 70, 72, 74, 76,
            78, 80, 82, 84, 86, 88, 89, 90, 91, 92,
            93, 94, 95, 96, 97, 98, 98, 99, 99, 99
        ],
        healthy: [
            2, 5, 8, 10, 12, 15, 18, 20, 22, 25,
            28, 30, 32, 35, 38, 40, 42, 44, 46, 48,
            50, 52, 54, 56, 58, 60, 62, 64, 66, 68,
            8, 12, 16, 20, 24, 28, 32, 36, 40, 44,
            5, 10, 15, 20, 25, 30, 35, 40, 45, 50,
            6, 11, 16, 21, 26, 31, 36, 41, 46, 51,
            4, 9, 14, 19, 24, 29, 34, 39, 44, 49
        ]
    },
    unseparated: {
        // Moderate overlap - AUC ~0.7
        pneumonia: [
            38, 42, 45, 48, 52, 55, 58, 60, 62, 65,
            68, 70, 72, 75, 78, 80, 82, 85, 88, 90,
            45, 50, 55, 60, 65, 70, 58, 62, 68, 72
        ],
        healthy: [
            8, 12, 15, 18, 22, 25, 28, 32, 35, 38,
            40, 42, 45, 48, 50, 52, 55, 58, 60, 62,
            12, 18, 24, 30, 36, 42, 48, 54, 58, 62,
            15, 22, 28, 35, 40, 45, 50, 55, 60, 65,
            10, 16, 22, 28, 34, 40, 46, 52, 58, 64,
            14, 20, 26, 32, 38, 44, 50, 56, 62, 68,
            18, 25, 32, 38, 45, 52, 58, 64, 70, 72
        ]
    },
    imbalanced: {
        // Few positive cases - only 10 pneumonia patients out of 100
        // Similar discrimination to Subtle Cases (AUC ~0.7) but lower prevalence
        pneumonia: [
            42, 50, 58, 65, 70, 75, 80, 85, 88, 92
        ],
        healthy: [
            8, 12, 15, 18, 22, 25, 28, 32, 35, 38,
            10, 15, 20, 25, 30, 35, 40, 45, 50, 55,
            12, 18, 24, 30, 36, 42, 48, 54, 58, 62,
            15, 22, 28, 35, 40, 45, 50, 55, 60, 65,
            10, 16, 22, 28, 34, 40, 46, 52, 58, 64,
            14, 20, 26, 32, 38, 44, 50, 56, 62, 68,
            18, 25, 32, 38, 45, 52, 58, 64, 70, 72,
            8, 14, 20, 26, 32, 38, 44, 50, 56, 62,
            12, 18, 24, 30, 36, 42, 48, 54, 60, 66
        ]
    }
};

let currentDataset = 'separated';
let threshold = 50;
let patients = [];
let currentPrevalence = 10; // Default prevalence for imbalanced dataset (percentage)

// Initialize
function init() {
    generatePatients();
    setupThresholdDrag();
    updateVisualization();
}

function generatePatients() {
    const chartArea = document.getElementById('chartArea');
    // Clear existing patients
    document.querySelectorAll('.patient-dot').forEach(el => el.remove());

    patients = [];
    const data = datasets[currentDataset];

    if (currentDataset === 'imbalanced') {
        // For imbalanced dataset, generate patients based on prevalence slider
        const totalPatients = 100;
        const numPositive = Math.round(totalPatients * currentPrevalence / 100);
        const numNegative = totalPatients - numPositive;

        // Sample from pneumonia scores (with replacement if needed)
        const pneumoniaScores = data.pneumonia;
        for (let i = 0; i < numPositive; i++) {
            const score = pneumoniaScores[i % pneumoniaScores.length];
            // Add some variation if we're reusing scores
            const variation = i >= pneumoniaScores.length ? (Math.random() * 10 - 5) : 0;
            patients.push({
                score: Math.max(0, Math.min(100, score + variation)),
                hasPneumonia: true,
                yOffset: 20 + (i % 8) * 22 + Math.random() * 10
            });
        }

        // Sample from healthy scores (with replacement if needed)
        const healthyScores = data.healthy;
        for (let i = 0; i < numNegative; i++) {
            const score = healthyScores[i % healthyScores.length];
            patients.push({
                score: score,
                hasPneumonia: false,
                yOffset: 20 + (i % 8) * 22 + Math.random() * 10
            });
        }
    } else {
        // Add pneumonia patients
        data.pneumonia.forEach((score, i) => {
            patients.push({
                score: score,
                hasPneumonia: true,
                yOffset: 20 + (i % 8) * 22 + Math.random() * 10
            });
        });

        // Add healthy patients
        data.healthy.forEach((score, i) => {
            patients.push({
                score: score,
                hasPneumonia: false,
                yOffset: 20 + (i % 8) * 22 + Math.random() * 10
            });
        });
    }

    // Create dots
    patients.forEach((patient, i) => {
        const dot = document.createElement('div');
        dot.className = `patient-dot ${patient.hasPneumonia ? 'has-pneumonia' : 'healthy'}`;
        dot.style.left = `${patient.score}%`;
        dot.style.top = `${patient.yOffset}px`;
        dot.dataset.index = i;
        dot.title = `Score: ${patient.score}%\n${patient.hasPneumonia ? 'Has pneumonia' : 'Healthy'}`;
        chartArea.appendChild(dot);
    });
}

function setupThresholdDrag() {
    const thresholdLine = document.getElementById('thresholdLine');
    const chartArea = document.getElementById('chartArea');
    let isDragging = false;

    thresholdLine.style.left = `${threshold}%`;

    const startDrag = (e) => {
        isDragging = true;
        e.preventDefault();
    };

    const doDrag = (e) => {
        if (!isDragging) return;

        const rect = chartArea.getBoundingClientRect();
        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        let x = ((clientX - rect.left) / rect.width) * 100;
        x = Math.max(5, Math.min(95, x));

        threshold = Math.round(x);
        thresholdLine.style.left = `${threshold}%`;
        updateVisualization();
    };

    const endDrag = () => {
        isDragging = false;
    };

    thresholdLine.addEventListener('mousedown', startDrag);
    thresholdLine.addEventListener('touchstart', startDrag);
    document.addEventListener('mousemove', doDrag);
    document.addEventListener('touchmove', doDrag);
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);

    // Also allow clicking anywhere on the chart
    chartArea.addEventListener('click', (e) => {
        if (e.target === chartArea || e.target.classList.contains('patient-dot')) {
            const rect = chartArea.getBoundingClientRect();
            let x = ((e.clientX - rect.left) / rect.width) * 100;
            x = Math.max(5, Math.min(95, x));
            threshold = Math.round(x);
            thresholdLine.style.left = `${threshold}%`;
            updateVisualization();
        }
    });
}

function updateVisualization() {
    // Update threshold label
    document.getElementById('thresholdLabel').textContent = `Threshold: ${threshold}%`;

    // Calculate confusion matrix
    let tp = 0, fn = 0, fp = 0, tn = 0;

    patients.forEach((patient, i) => {
        const predictedPositive = patient.score >= threshold;
        const dot = document.querySelector(`.patient-dot[data-index="${i}"]`);

        if (patient.hasPneumonia) {
            if (predictedPositive) {
                tp++;
            } else {
                fn++;
            }
        } else {
            if (predictedPositive) {
                fp++;
            } else {
                tn++;
            }
        }

        // Update dot appearance
        if (dot) {
            dot.classList.toggle('predicted-positive', predictedPositive);
        }
    });

    // Update confusion matrix display
    document.getElementById('tpCount').textContent = tp;
    document.getElementById('fnCount').textContent = fn;
    document.getElementById('fpCount').textContent = fp;
    document.getElementById('tnCount').textContent = tn;

    // Calculate metrics
    const total = tp + tn + fp + fn;
    const accuracy = total > 0 ? ((tp + tn) / total * 100) : 0;
    const recall = tp + fn > 0 ? (tp / (tp + fn) * 100) : 0;
    const fpr = fp + tn > 0 ? (fp / (fp + tn) * 100) : 0;
    const precision = tp + fp > 0 ? (tp / (tp + fp) * 100) : 0;
    const npv = tn + fn > 0 ? (tn / (tn + fn) * 100) : 0;
    const f1 = (precision + recall) > 0 ? (2 * precision * recall / (precision + recall)) : 0;

    document.getElementById('accuracy').textContent = accuracy.toFixed(0) + '%';
    document.getElementById('recall').textContent = recall.toFixed(0) + '%';
    document.getElementById('fpr').textContent = fpr.toFixed(0) + '%';
    document.getElementById('precision').textContent = precision.toFixed(0) + '%';
    document.getElementById('npv').textContent = npv.toFixed(0) + '%';
    document.getElementById('f1').textContent = f1.toFixed(0) + '%';

    // Update clinical interpretation
    document.getElementById('accuracyText').textContent = accuracy.toFixed(0) + '%';
    document.getElementById('recallText').textContent = recall.toFixed(0) + '%';
    document.getElementById('fprText').textContent = fpr.toFixed(0) + '%';
    document.getElementById('npvText').textContent = npv.toFixed(0) + '%';

    // Highlight metrics that changed significantly
    highlightMetric('recallCard', recall);
    highlightMetric('precisionCard', precision);

    // Update curve (ROC or PR)
    drawCurve(fpr / 100, recall / 100, precision / 100, recall / 100);
}

function highlightMetric(cardId, value) {
    const card = document.getElementById(cardId);
    card.classList.remove('highlight');
    // Add highlight animation
    setTimeout(() => card.classList.add('highlight'), 10);
}

let currentCurveType = 'roc';

function calculateROCPoints() {
    const points = [];
    const totalPositive = patients.filter(p => p.hasPneumonia).length;
    const totalNegative = patients.filter(p => !p.hasPneumonia).length;

    // Calculate TPR and FPR for thresholds from 0 to 100
    for (let t = 0; t <= 100; t += 2) {
        let tp = 0, fp = 0;
        patients.forEach(patient => {
            if (patient.score >= t) {
                if (patient.hasPneumonia) tp++;
                else fp++;
            }
        });
        const tpr = totalPositive > 0 ? tp / totalPositive : 0;
        const fpr = totalNegative > 0 ? fp / totalNegative : 0;
        points.push({ fpr, tpr, threshold: t });
    }
    return points;
}

function calculatePRPoints() {
    const points = [];
    const totalPositive = patients.filter(p => p.hasPneumonia).length;

    // Calculate Precision and Recall for thresholds from 100 down to 0
    // This gives us points from high precision/low recall to low precision/high recall
    for (let t = 100; t >= 0; t -= 1) {
        let tp = 0, fp = 0;
        patients.forEach(patient => {
            if (patient.score >= t) {
                if (patient.hasPneumonia) tp++;
                else fp++;
            }
        });
        const recall = totalPositive > 0 ? tp / totalPositive : 0;
        const precision = (tp + fp) > 0 ? tp / (tp + fp) : 1;
        points.push({ recall, precision, threshold: t });
    }

    // Apply interpolation: for each point, precision should be the max precision
    // at that recall or any higher recall (standard PR curve interpolation)
    for (let i = points.length - 2; i >= 0; i--) {
        points[i].precision = Math.max(points[i].precision, points[i + 1].precision);
    }

    return points;
}

function calculateAUC(points) {
    // Sort by FPR for ROC
    const sorted = [...points].sort((a, b) => a.fpr - b.fpr);
    let auc = 0;
    for (let i = 1; i < sorted.length; i++) {
        const width = sorted[i].fpr - sorted[i-1].fpr;
        const avgHeight = (sorted[i].tpr + sorted[i-1].tpr) / 2;
        auc += width * avgHeight;
    }
    return auc;
}

function calculateAUCPR(points) {
    // Sort by recall for PR curve
    const sorted = [...points].sort((a, b) => a.recall - b.recall);
    let auc = 0;
    for (let i = 1; i < sorted.length; i++) {
        const width = sorted[i].recall - sorted[i-1].recall;
        const avgHeight = (sorted[i].precision + sorted[i-1].precision) / 2;
        auc += width * avgHeight;
    }
    return auc;
}

function drawCurve(currentFPR, currentTPR, currentPrecision, currentRecall) {
    const canvas = document.getElementById('curveCanvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const padding = 30;
    const plotWidth = width - padding * 2;
    const plotHeight = height - padding * 2;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw background
    ctx.fillStyle = '#f7fafc';
    ctx.fillRect(padding, padding, plotWidth, plotHeight);

    // Draw reference line
    ctx.strokeStyle = '#cbd5e0';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    if (currentCurveType === 'roc') {
        // Diagonal for ROC (random classifier)
        ctx.moveTo(padding, height - padding);
        ctx.lineTo(width - padding, padding);
    } else {
        // Horizontal line at baseline prevalence for PR
        const prevalence = patients.filter(p => p.hasPneumonia).length / patients.length;
        const baselineY = height - padding - prevalence * plotHeight;
        ctx.moveTo(padding, baselineY);
        ctx.lineTo(width - padding, baselineY);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw axes
    ctx.strokeStyle = '#53565A';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Draw axis ticks and labels
    ctx.fillStyle = '#53565A';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    for (let i = 0; i <= 4; i++) {
        const val = i * 0.25;
        const x = padding + val * plotWidth;
        const y = height - padding - val * plotHeight;

        // X-axis ticks
        ctx.beginPath();
        ctx.moveTo(x, height - padding);
        ctx.lineTo(x, height - padding + 5);
        ctx.stroke();
        ctx.fillText(val.toFixed(2), x, height - padding + 15);

        // Y-axis ticks
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(padding - 5, y);
        ctx.stroke();
        ctx.textAlign = 'right';
        ctx.fillText(val.toFixed(2), padding - 8, y + 3);
        ctx.textAlign = 'center';
    }

    // Calculate and draw curve
    let auc;
    let curvePoints;
    let currentX, currentY;

    if (currentCurveType === 'roc') {
        curvePoints = calculateROCPoints();
        auc = calculateAUC(curvePoints);
        curvePoints.sort((a, b) => a.fpr - b.fpr);

        // Draw ROC curve
        ctx.strokeStyle = '#8C1515';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        curvePoints.forEach((point, i) => {
            const x = padding + point.fpr * plotWidth;
            const y = height - padding - point.tpr * plotHeight;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.stroke();

        currentX = padding + currentFPR * plotWidth;
        currentY = height - padding - currentTPR * plotHeight;
    } else {
        curvePoints = calculatePRPoints();
        auc = calculateAUCPR(curvePoints);
        // Points are already in order from calculatePRPoints (no sorting needed)

        // Draw PR curve
        ctx.strokeStyle = '#8C1515';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        let isFirst = true;
        curvePoints.forEach((point) => {
            const x = padding + point.recall * plotWidth;
            const y = height - padding - point.precision * plotHeight;
            if (isFirst) {
                ctx.moveTo(x, y);
                isFirst = false;
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.stroke();

        currentX = padding + currentRecall * plotWidth;
        currentY = height - padding - currentPrecision * plotHeight;
    }

    document.getElementById('aucValue').textContent = auc.toFixed(2);

    // Draw current operating point
    ctx.fillStyle = '#620059';
    ctx.beginPath();
    ctx.arc(currentX, currentY, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(currentX, currentY, 4, 0, Math.PI * 2);
    ctx.fill();
}

function updateCurveLabels() {
    const yLabel = document.getElementById('curveYLabel');
    const xLabel = document.getElementById('curveXLabel');

    if (currentCurveType === 'roc') {
        yLabel.textContent = 'Recall (TPR)';
        xLabel.textContent = 'False Positive Rate';
    } else {
        yLabel.textContent = 'Precision (PPV)';
        xLabel.textContent = 'Recall (Sensitivity)';
    }
}

function setupCurveToggle() {
    document.querySelectorAll('.curve-toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentCurveType = btn.dataset.curve;

            // Update button states
            document.querySelectorAll('.curve-toggle-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update labels and redraw
            updateCurveLabels();
            updateVisualization();
        });
    });
}

function setupPrevalenceSlider() {
    const slider = document.getElementById('prevalenceSlider');
    const valueDisplay = document.getElementById('prevalenceValue');

    if (slider && valueDisplay) {
        slider.addEventListener('input', () => {
            currentPrevalence = parseInt(slider.value);
            valueDisplay.textContent = currentPrevalence + '%';
            // Update explanation to reflect new prevalence
            document.getElementById('datasetExplanation').innerHTML = getDatasetExplanation('imbalanced');
            generatePatients();
            updateVisualization();
        });
    }
}

function getDatasetExplanation(name) {
    const explanations = {
        separated: "<strong>Severe Cases:</strong> X-rays with obvious findings—large lobar consolidations, clear air bronchograms. The AI easily distinguishes these from normal studies.",
        unseparated: "<strong>Subtle Cases:</strong> X-rays with subtle findings—faint infiltrates, retrocardiac opacities, or patterns that mimic artifact. The AI struggles to distinguish real pathology from noise.",
        imbalanced: `<strong>Low Prevalence:</strong> Only ${currentPrevalence}% of patients have pneumonia. Compare to Subtle Cases: similar AUC, but precision is worse at the same threshold. Why? Fewer true positives means false positives dominate.`
    };
    return explanations[name];
}

function setDataset(name, btn) {
    currentDataset = name;

    // Update button states
    document.querySelectorAll('.dataset-btn').forEach(b => {
        b.classList.remove('active');
    });
    if (btn) btn.classList.add('active');

    // Update explanation
    document.getElementById('datasetExplanation').innerHTML = getDatasetExplanation(name);

    // Show/hide prevalence slider for imbalanced dataset
    const sliderContainer = document.getElementById('prevalenceSliderContainer');
    if (sliderContainer) {
        sliderContainer.style.display = name === 'imbalanced' ? 'block' : 'none';
    }

    generatePatients();
    updateVisualization();
}

// Accordion functionality
function setupAccordions() {
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isActive = header.classList.contains('active');

            // Toggle current accordion
            header.classList.toggle('active');
            content.classList.toggle('show');
        });
    });
}

// Main Tab functionality (Learn/Experiment)
function setupMainTabs() {
    document.querySelectorAll('.main-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.mainTab;

            // Update button states
            document.querySelectorAll('.main-tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update panel visibility
            document.querySelectorAll('.main-tab-panel').forEach(panel => panel.classList.remove('active'));
            const activePanel = document.querySelector(`.main-tab-panel[data-main-tab="${tabId}"]`);
            if (activePanel) activePanel.classList.add('active');
        });
    });
}

// Tab functionality
function switchToTab(tabId) {
    // Update button states
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    const activeBtn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
    if (activeBtn) activeBtn.classList.add('active');

    // Update panel visibility
    document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
    const activePanel = document.querySelector(`.tab-panel[data-tab="${tabId}"]`);
    if (activePanel) activePanel.classList.add('active');
}

function setupTabs() {
    // Desktop tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            switchToTab(btn.dataset.tab);
        });
    });

    // Mobile accordion headers
    document.querySelectorAll('.tab-accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const panel = header.closest('.tab-panel');
            const tabId = panel.dataset.tab;
            const isActive = panel.classList.contains('active');

            if (isActive) {
                // Close if already open (mobile accordion behavior)
                panel.classList.remove('active');
            } else {
                // Open this tab (syncs both tabs and accordion)
                switchToTab(tabId);
            }
        });
    });
}

// Toggle answer visibility
function toggleAnswer(btn) {
    const answerContent = btn.nextElementSibling;
    const isShowing = answerContent.classList.contains('show');

    answerContent.classList.toggle('show');
    btn.classList.toggle('active');
    btn.textContent = isShowing ? 'Show Answer' : 'Hide Answer';
}

// Mobile popup
function checkMobileAndShowPopup() {
    const isMobile = window.innerWidth < 768;
    const dismissed = sessionStorage.getItem('mobilePopupDismissed');

    if (isMobile && !dismissed) {
        document.getElementById('mobilePopup').classList.add('show');
    }
}

function dismissMobilePopup() {
    document.getElementById('mobilePopup').classList.remove('show');
    sessionStorage.setItem('mobilePopupDismissed', 'true');
}

// Initialize on load
window.addEventListener('DOMContentLoaded', () => {
    init();
    setupAccordions();
    setupMainTabs();
    setupTabs();
    setupCurveToggle();
    setupPrevalenceSlider();
    checkMobileAndShowPopup();
});
