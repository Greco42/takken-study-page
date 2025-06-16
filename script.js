document.addEventListener('DOMContentLoaded', function() {
    const checkboxes = document.querySelectorAll('#study-list input[type="checkbox"]');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const totalItems = checkboxes.length;

    function updateProgress() {
        let checkedCount = 0;
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                checkedCount++;
            }
        });

        const progress = (totalItems > 0) ? (checkedCount / totalItems) * 100 : 0;
        
        progressBar.style.width = progress + '%';
        progressText.textContent = Math.round(progress) + '%';
    }

    function saveState() {
        checkboxes.forEach(checkbox => {
            localStorage.setItem(checkbox.id, checkbox.checked);
        });
    }

    function loadState() {
        checkboxes.forEach(checkbox => {
            const savedState = localStorage.getItem(checkbox.id);
            if (savedState !== null) {
                checkbox.checked = (savedState === 'true');
            }
        });
    }

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            updateProgress();
            saveState();
        });
    });

    // 初期読み込み時に状態を復元し、進捗を更新
    loadState();
    updateProgress();
});