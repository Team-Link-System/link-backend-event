# Event Processing Service

이벤트 처리 시스템은 다양한 토픽에 대한 이벤트를 수신하고 처리하며, MongoDB, PostgreSQL에 저장하는 서비스입니다.

## 기술 스택

- Node.js
- TypeScript
- Express
- MongoDB
- PostgreSQL
- NATS (메시지 브로커)
- Redis
- PM2
- Docker

## 개발 환경 설정

### 필수 요구사항

- Node.js 18 이상
- npm 9 이상
- Docker

### 설치 및 실행

1. 저장소 클론
```bash
git clone <repository-url>
cd event-processing-service
```

2. 의존성 설치
```bash
npm install
```

3. 개발 모드 실행
```bash
npm run dev
```

## 빌드 및 배포 프로세스

### 로컬 빌드

TypeScript 코드를 JavaScript로 컴파일합니다:
```bash
npm run build
```

### Docker 이미지 빌드

1. TypeScript 코드를 먼저 빌드합니다:
```bash
npm run build
```

2. Docker 이미지를 빌드합니다:
```bash
npm run docker:build
# 또는 직접 명령어 실행
docker build -t <image-name>:<tag> .
```

3. 이미지를 레지스트리에 푸시합니다:
```bash
npm run docker:push
# 또는 직접 명령어 실행
docker push <image-name>:<tag>
```

4. 한 번에 빌드 및 푸시하기:
```bash
npm run deploy
```

## 환경 변수 설정

서비스는 다음 환경 변수를 사용합니다:

| 변수명 | 설명 |
|--------|------|
| PORT | 서버 포트 |
| MONGO_URI | MongoDB 연결 문자열 |
| NATS_URI | NATS 연결 문자열 |
| NATS_JETSTREAM_MAX_AGE | NATS Jetstream 최대 보관 기간 |
| NATS_JETSTREAM_MAX_BYTES | NATS Jetstream 최대 데이터 크기 |
| NATS_JETSTREAM_MAX_MESSAGES | NATS Jetstream 최대 메시지 수 |
| REDIS_HOST | Redis 호스트 |
| REDIS_PORT | Redis 포트 |
| REDIS_PASSWORD | Redis 비밀번호 |
| POSTGRES_URI | PostgreSQL 연결 문자열 |
| POSTGRES_DB_HOST | PostgreSQL 호스트 |
| POSTGRES_SSL | PostgreSQL SSL 사용 여부 |
| POSTGRES_USER | PostgreSQL 사용자 |
| POSTGRES_PASSWORD | PostgreSQL 비밀번호 |
| POSTGRES_DB | PostgreSQL 데이터베이스 이름 |
| POSTGRES_PORT | PostgreSQL 포트 |

## 개발 가이드

### 디렉토리 구조

```
event-processing-service/
├── src/
│   ├── domain/
│   │   ├── entities/
│   │   ├── repositories/
│   │   └── usecases/
│   ├── infrastructure/
│   │   ├── mongodb/
│   │   ├── postgres/
│   │   ├── nats/
│   │   └── redis/
│   ├── presentation/
│   │   └── controllers/
│   └── server.ts
├── dist/            # 빌드된 파일
├── tests/           # 테스트 파일
├── Dockerfile
├── ecosystem.config.js
└── package.json
```

### 테스트 실행

```bash
# 모든 테스트 실행
npm test

# 테스트 커버리지 확인
npm run test:coverage
```

## 로깅 및 모니터링

서비스는 PM2를 통해 실행되며, 로그는 다음과 같이 확인할 수 있습니다:

```bash
# 컨테이너 로그 확인 (Docker 환경)
docker logs <container-id>
```

## 트러블슈팅

일반적인 문제 해결:

1. **MongoDB 연결 실패**: MONGO_URI 환경 변수가 올바르게 설정되어 있는지 확인하세요.
2. **PostgreSQL 연결 실패**: POSTGRES_URI 또는 관련 환경 변수가 올바르게 설정되어 있는지 확인하세요.
3. **NATS 연결 실패**: NATS_URI 환경 변수가 올바른지 확인하고 NATS 서버가 실행 중인지 확인하세요.
4. **서비스가 시작되지 않음**: 로그를 확인하여 오류 메시지를 파악하세요.
5. **이벤트가 처리되지 않음**: NATS 연결 상태와 토픽 구독이 올바르게 설정되었는지 확인하세요.

## 이미지 사용 방법

레지스트리에서 이미지를 직접 사용하는 방법:

```bash
# 이미지 가져오기
docker pull <image-name>:<tag>

# 컨테이너 실행 (환경 변수 설정 필요)
docker run -d \
  -p 9000:9000 \
  -e MONGO_URI=<mongodb-connection-string> \
  -e NATS_URI=<nats-connection-string> \
  -e POSTGRES_URI=<postgres-connection-string> \
  -e REDIS_HOST=<redis-host> \
  -e REDIS_PORT=<redis-port> \
  -e REDIS_PASSWORD=<redis-password> \
  --name event-service \
  <image-name>:<tag>
```

## 배포 참고사항

이 프로젝트는 Docker 이미지를 통해 배포되며, 쿠버네티스 환경에서 실행됩니다. 쿠버네티스 배포 시 다음 내용을 참고하세요:

- 포트: 9000
- 필요한 환경 변수는 쿠버네티스 ConfigMap이나 Secret으로 제공해야 함

