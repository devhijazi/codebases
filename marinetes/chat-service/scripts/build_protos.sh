#!/bin/bash

PROTOS_DIR="./protos"
PROTOS_OUT="./protos/generated"

rm -rf $PROTOS_OUT
mkdir -p $PROTOS_OUT
touch $PROTOS_OUT/.gitkeep

yarn protoc \
  --ts_out $PROTOS_OUT \
  --ts_opt client_none \
  --ts_opt output_javascript \
  --ts_opt server_generic \
  --proto_path $PROTOS_DIR $PROTOS_DIR/*.proto