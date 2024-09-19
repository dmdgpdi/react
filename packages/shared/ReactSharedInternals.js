/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import * as React from 'react';

// React의 내부 API를 노출시키는 객체
// 주의: 이 객체는 React의 내부 구현에 대한 접근을 제공하며, 사용자에게는 경고를 표시하거나 업그레이드를 막기 위해 사용됩니다.
// 실제로는 이 API를 직접 사용하는 것을 권장하지 않으며, 향후 React 버전에서 변경될 수 있습니다.
const ReactSharedInternals =
  React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;

// ReactSharedInternals를 기본 내보내기로 설정
// 이 객체는 주로 내부적인 개발과 디버깅 목적으로 사용됩니다.
export default ReactSharedInternals;
