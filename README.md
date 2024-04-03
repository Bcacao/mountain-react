
# 프로젝트 이름

## 프로젝트 소개
이 프로젝트는 인스타그램과 같은 형식의 사진 기반의 게시글을 포스팅하고, 포스팅한 게시물에 댓글을 달면서 소통할 수 있는 웹사이트를 만들었습니다.

## 주요 기능
- 로그인, 회원가입 기능
- 게시글 포스팅 기능
- 게시글 수정, 삭제 기능
- 댓글 작성, 삭제 기능

## 기술 스택
- React
- Axios (비동기 요청)

## 배포 방법
웹사이트는 AWS S3 버킷에 정적 웹사이트로 배포할 수 있습니다. 배포 프로세스는 다음과 같습니다:

1. 프로젝트 빌드:
   ```bash
   npm run build
   ```
   이 명령은 `build` 디렉토리에 프로젝트의 빌드된 정적 파일들을 생성합니다.

2. AWS CLI 설치 및 설정:
   AWS CLI를 사용하여 S3 버킷에 빌드 파일을 업로드하기 전에, CLI가 설치되어 있어야 하며, `aws configure` 명령으로 AWS 계정 정보를 설정합니다.
   ```bash
   aws configure
   ```
   이 단계에서 AWS Access Key ID, Secret Access Key, 기본 리전, 출력 형식을 입력합니다.

3. S3 버킷에 빌드 파일 업로드:
   다음 명령을 사용하여 `build` 디렉토리의 내용을 S3 버킷으로 동기화합니다.
   ```bash
   aws s3 sync ./build s3://marku.co.kr
   ```
   여기서 `marku.co.kr`은 실제 S3 버킷 이름으로 대체해야 합니다.
