document.addEventListener('DOMContentLoaded', function() {
    const checkboxes = document.querySelectorAll('.subject-group input[type="checkbox"]');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const totalItems = checkboxes.length;

    // 進捗を更新する関数
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

    // チェック状態をブラウザに保存する関数
    function saveState() {
        checkboxes.forEach(checkbox => {
            // key: checkboxのid, value: 'true' or 'false'
            localStorage.setItem(checkbox.id, checkbox.checked);
        });
    }

    // 保存された状態を読み込んで復元する関数
    function loadState() {
        checkboxes.forEach(checkbox => {
            const savedState = localStorage.getItem(checkbox.id);
            if (savedState !== null) {
                checkbox.checked = (savedState === 'true');
            }
        });
    }

    // 各チェックボックスにイベントリスナーを追加
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            updateProgress();
            saveState();
        });
    });

    // ページ読み込み時に状態を復元し、進捗を更新
    loadState();
    updateProgress();
});