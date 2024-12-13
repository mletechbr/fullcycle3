# Stage 1: Build stage
FROM golang:1.20-alpine AS build

# Set the working directory
WORKDIR /app

# Copy and download dependencies
#COPY go.mod go.sum ./
COPY go.mod ./
RUN go mod download

# Copy the source code
COPY main.go .

# Build the Go application
RUN CGO_ENABLED=0 GOOS=linux go build -o /desafio-go main.go

# Stage 2: Final stage
FROM scratch

# Set the working directory
WORKDIR /

# Copy the binary from the build stage
COPY --from=build /desafio-go /desafio-go

# Set the entrypoint command
ENTRYPOINT ["/desafio-go"]

