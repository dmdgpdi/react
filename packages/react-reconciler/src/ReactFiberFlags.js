/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import {enableCreateEventHandleAPI} from 'shared/ReactFeatureFlags';

export type Flags = number;

/**
 *
 * 이 코드는 React에서 Fiber 노드의 플래그(flag) 시스템을 정의하는 부분입니다.
 * 각 플래그는 이진수 비트로 표현되며, Fiber가 어떤 작업을 수행해야 하는지, 또는 어떤 상태에 있는지를 나타냅니다.
 * React는 이를 통해 컴포넌트의 업데이트, 배치, 삭제 등 다양한 작업을 효율적으로 관리합니다.
 */

// Don't change these values. They're used by React Dev Tools.
export const NoFlags = /*                      */ 0b0000000000000000000000000000;
// 기본 값으로, 아무 작업도 수행되지 않은 상태를 나타냅니다.

export const PerformedWork = /*                */ 0b0000000000000000000000000001;
// 해당 Fiber에서 작업이 수행되었음을 나타냅니다.
export const Placement = /*                    */ 0b0000000000000000000000000010;
// 새로 추가된 요소를 DOM에 삽입해야 함을 나타냅니다.
export const DidCapture = /*                   */ 0b0000000000000000000010000000;
// 에러가 발생하여 에러 경계(Error Boundary)가 해당 에러를 캡처했음을 나타냅니다.
export const Hydrating = /*                    */ 0b0000000000000001000000000000;
// 서버에서 렌더링된 요소를 클라이언트에서 "hydrate" 해야 함을 나타냅니다.
// You can change the rest (and add more).
export const Update = /*                       */ 0b0000000000000000000000000100;
// 해당 Fiber에 업데이트가 필요함을 나타냅니다.
export const Cloned = /*                       */ 0b0000000000000000000000001000;
// 해당 Fiber가 복제되었음을 나타냅니다.

export const ChildDeletion = /*                */ 0b0000000000000000000000010000;
// 자식 요소가 삭제될 예정임을 나타냅니다.
export const ContentReset = /*                 */ 0b0000000000000000000000100000;
// 호스트 요소의 콘텐츠가 리셋되어야 함을 나타냅니다.
export const Callback = /*                     */ 0b0000000000000000000001000000;
/* Used by DidCapture:                            0b0000000000000000000010000000; */
// 특정 콜백이 실행되어야 함을 나타냅니다.

export const ForceClientRender = /*            */ 0b0000000000000000000100000000;
// 클라이언트에서 강제적으로 다시 렌더링해야 함을 나타냅니다.
export const Ref = /*                          */ 0b0000000000000000001000000000;
// ref가 변경되어야 함을 나타냅니다.
export const Snapshot = /*                     */ 0b0000000000000000010000000000;
// 컴포넌트가 렌더링 후 getSnapshotBeforeUpdate 같은 스냅샷을 저장해야 함을 나타냅니다.
export const Passive = /*                      */ 0b0000000000000000100000000000;
/* Used by Hydrating:                             0b0000000000000001000000000000; */
// 패시브 효과(Hook에서 useEffect 같은 비동기 작업)가 있음을 나타냅니다.

export const Visibility = /*                   */ 0b0000000000000010000000000000;
// 요소의 가시성 관련 작업이 필요함을 나타냅니다.
export const StoreConsistency = /*             */ 0b0000000000000100000000000000;
// 상태가 일관성이 있는지 확인하는 작업을 나타냅니다.

// It's OK to reuse these bits because these flags are mutually exclusive for
// different fiber types. We should really be doing this for as many flags as
// possible, because we're about to run out of bits.
export const ScheduleRetry = StoreConsistency;
export const ShouldSuspendCommit = Visibility;
export const DidDefer = ContentReset;
export const FormReset = Snapshot;
// StoreConsistency, Visibility, ContentReset, **Snapshot**의 재사용 플래그들입니다.

export const LifecycleEffectMask =
  Passive | Update | Callback | Ref | Snapshot | StoreConsistency;
// 라이프사이클과 관련된 여러 플래그의 결합 (예: Passive, Update, Callback 등).

// Union of all commit flags (flags with the lifetime of a particular commit)
export const HostEffectMask = /*               */ 0b0000000000000111111111111111;
// 커밋 단계에서 실행되는 모든 플래그의 결합입니다. 즉, 커밋과 관련된 모든 작업을 나타냅니다.

// These are not really side effects, but we still reuse this field.
export const Incomplete = /*                   */ 0b0000000000001000000000000000;
// 작업이 아직 완료되지 않은 상태임을 나타냅니다.
export const ShouldCapture = /*                */ 0b0000000000010000000000000000;
// 에러가 발생할 때 캡처해야 함을 나타냅니다.
export const ForceUpdateForLegacySuspense = /* */ 0b0000000000100000000000000000;
// Legacy Suspense에서 강제로 업데이트가 발생해야 함을 나타냅니다.
export const DidPropagateContext = /*          */ 0b0000000001000000000000000000;
// Context가 전파되었음을 나타냅니다.
export const NeedsPropagation = /*             */ 0b0000000010000000000000000000;
// Context가 전파되어야 함을 나타냅니다.
export const Forked = /*                       */ 0b0000000100000000000000000000;
// Fiber 트리가 fork된 상태임을 나타냅니다.

// Static tags describe aspects of a fiber that are not specific to a render,
// e.g. a fiber uses a passive effect (even if there are no updates on this particular render).
// This enables us to defer more work in the unmount case,
// since we can defer traversing the tree during layout to look for Passive effects,
// and instead rely on the static flag as a signal that there may be cleanup work.
export const RefStatic = /*                    */ 0b0000001000000000000000000000;
export const LayoutStatic = /*                 */ 0b0000010000000000000000000000;
export const PassiveStatic = /*                */ 0b0000100000000000000000000000;
export const MaySuspendCommit = /*             */ 0b0001000000000000000000000000;
// 해당 Fiber가 Passive/Ref/레이아웃 효과를 사용하는지 여부를 나타내는 플래그들입니다.
// 이를 통해 Unmount 중 작업을 지연시킬 수 있습니다.

// Flag used to identify newly inserted fibers. It isn't reset after commit unlike `Placement`.
export const PlacementDEV = /*                 */ 0b0010000000000000000000000000;
export const MountLayoutDev = /*               */ 0b0100000000000000000000000000;
export const MountPassiveDev = /*              */ 0b1000000000000000000000000000;
// 개발 모드에서 Fiber 노드가 새로 삽입되었거나 마운트 시 실행되는 작업을 추적합니다.

// Groups of flags that are used in the commit phase to skip over trees that
// don't contain effects, by checking subtreeFlags.

export const BeforeMutationMask: number =
  // TODO: Remove Update flag from before mutation phase by re-landing Visibility
  // flag logic (see #20043)
  Update |
  Snapshot |
  (enableCreateEventHandleAPI
    ? // createEventHandle needs to visit deleted and hidden trees to
      // fire beforeblur
      // TODO: Only need to visit Deletions during BeforeMutation phase if an
      // element is focused.
      ChildDeletion | Visibility
    : 0);

export const MutationMask =
  Placement |
  Update |
  ChildDeletion |
  ContentReset |
  Ref |
  Hydrating |
  Visibility |
  FormReset;
export const LayoutMask = Update | Callback | Ref | Visibility;

// TODO: Split into PassiveMountMask and PassiveUnmountMask
export const PassiveMask = Passive | Visibility | ChildDeletion;

// Union of tags that don't get reset on clones.
// This allows certain concepts to persist without recalculating them,
// e.g. whether a subtree contains passive effects or portals.
export const StaticMask =
  LayoutStatic | PassiveStatic | RefStatic | MaySuspendCommit;
