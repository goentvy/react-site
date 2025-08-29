# Github Commit History Delete

## Github에 .env 파일이 올라가 API Key가 공유되어 Github에 있는 .env 파일을 지우고 해당 커밋 히스토리도 같이 정리가 필요한 경우에 사용하면 좋습니다.

### Orphan 브랜치를 사용한 방법

이 방법은 기존 저장소의 URL, 이슈, 풀 리퀘스트, 팀 설정을 유지하면서 커밋 히스토리만 삭제할수 있습니다.

#### 1. 메인 브랜치로 체크아웃 : 정리하려는 브랜치(보통 main 또는 master)로 전환합니다.

```bash
git checkout main
```

#### 2. Orphan 브랜치 생성: ​히스토리가 없는 새로운 "orphan" 브랜치를 만듭니다.

```bash
git checkout --orphan temp_branch
```

#### 3. 모든 파일 추가: ​현재 설정의 모든 파일을 이 새 브랜치에 추가합니다.

```bash
git add -A
```

#### 4. 변경사항 커밋: ​작업을 새로운 시작점으로 커밋합니다.

```bash
git commit -m "Initial commit"
```

#### 5. 기존 브랜치 삭제: 원래 브랜치(예: ​main)를 삭제합니다.

```bash
git branch -D main
```

#### 6. 새 브랜치 이름 변경: ​Orphan 브랜치에 원래 이름(main)을 부여합니다.

```bash
git branch -m main
```

#### 7. GitHub에 강제 푸시: ​원격 저장소에 새 히스토리를 푸시합니다(-f는 "강제"를 의미)

```bash
git push -f origin main
```


### Git Reset을 사용한 방법

특정 커밋들만 제거하고 싶다면 git rebase를 사용할 수 있습니다.

#### 1. 저장소 백업: 삭제 전 반드시 저장소를 백업합니다.

#### 2. 커밋 확인: 삭제할 커밋을 확인합니다.

```bash
git log --oneline
```

#### 3. Rebase로 커밋 제거: 예를 들어 마지막 3개 커밋을 제거하려면 다음 명령을 실행합니다.

```bash
git rebase -i HEAD~3
```

#### 4. 강제 푸시: 변경사항을 원격 저장소에 강제로 푸시합니다.
```bash
git push origin +main
```
