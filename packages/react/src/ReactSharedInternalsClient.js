/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {Dispatcher} from 'react-reconciler/src/ReactInternalTypes';
import type {AsyncDispatcher} from 'react-reconciler/src/ReactInternalTypes';
import type {BatchConfigTransition} from 'react-reconciler/src/ReactFiberTracingMarkerComponent';

export type SharedStateClient = {
  H: null | Dispatcher, // ReactCurrentDispatcher for Hooks
  A: null | AsyncDispatcher, // ReactCurrentCache for Cache
  T: null | BatchConfigTransition, // ReactCurrentBatchConfig for Transitions
  S: null | ((BatchConfigTransition, mixed) => void), // onStartTransitionFinish

  // DEV-only

  // ReactCurrentActQueue
  actQueue: null | Array<RendererTask>,

  // Used to reproduce behavior of `batchedUpdates` in legacy mode.
  isBatchingLegacy: boolean, // Legacy 모드에서 `batchedUpdates`의 동작을 재현하기 위한 플래그
  didScheduleLegacyUpdate: boolean, // Legacy 업데이트가 예약되었는지 여부를 추적하는 플래그

  // Tracks whether something called `use` during the current batch of work.
  // Determines whether we should yield to microtasks to unwrap already resolved
  // promises without suspending.
  // 현재 작업 배치에서 `use`가 호출되었는지 여부를 추적
  // 이미 해결된 Promise를 unwrap하기 위해 마이크로태스크에 양보해야 하는지 결정
  didUsePromise: boolean,

  // Track first uncaught error within this act
  // 이 act 내에서 처음 발생한 uncaught error를 추적
  thrownErrors: Array<mixed>,

  // ReactDebugCurrentFrame
  // 현재 스택을 가져오는 함수
  getCurrentStack: null | (() => string),
};

export type RendererTask = boolean => RendererTask | null;

// ReactSharedInternals 객체 생성 및 초기화
// SharedStateClient 타입을 사용하여 초기 상태를 설정
const ReactSharedInternals: SharedStateClient = ({
  H: null,
  A: null,
  T: null,
  S: null,
}: any);

if (__DEV__) {
  ReactSharedInternals.actQueue = null;
  ReactSharedInternals.isBatchingLegacy = false;
  ReactSharedInternals.didScheduleLegacyUpdate = false;
  ReactSharedInternals.didUsePromise = false;
  ReactSharedInternals.thrownErrors = [];
  // Stack implementation injected by the current renderer.
  ReactSharedInternals.getCurrentStack = (null: null | (() => string));
}

export default ReactSharedInternals;
